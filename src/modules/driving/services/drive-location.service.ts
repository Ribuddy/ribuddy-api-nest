import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { REDIS } from '@common/constants/redis.constants';

import { LatLonEleDto } from '@modules/driving/dto/common.driving.dto';
import { UserLocation } from '@modules/driving/types/drive-location.types';
import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';
import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';
import { TeamUsersService } from '@modules/users/services/team.users.service';

@Injectable()
export class DriveLocationService {
  private redis: Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly teamUserService: TeamUsersService,
    private readonly mysql: MySQLPrismaService,
    private readonly mongo: MongoDBPrismaService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async getRidingRecordInfo(ridingRecordId: string) {
    const ridingRecord = await this.mongo.ridingRecord.findUnique({
      where: { id: ridingRecordId },
    });

    if (!ridingRecord) {
      throw new NotFoundException('RidingRecord ID 값에 해당하는 기록이 존재하지 않습니다.');
    }

    return ridingRecord;
  }

  // riding record id의 주인과 제공된 userId가 일치하는지 확인하는 서비스
  async isRidingRecordOwner(ridingRecordId: string, userId: bigint) {
    const ridingRecord = await this.mongo.ridingRecord.findUnique({
      where: { id: ridingRecordId },
    });

    // TODO: custom error로 변환
    // ridingRecord가 없거나, 소유자가 아닌 경우 throw error
    if (!ridingRecord || ridingRecord.recordOwnerId !== userId.toString()) {
      throw new UnauthorizedException('본인의 라이딩 기록이 아닙니다.');
    }

    return;
  }

  // riding record id를 받아서, DB에 푸시하고 redis에도 사용자 위치 정보를 저장함
  async saveUserLocationToRidingRecord(ridingRecordId: string, loc: LatLonEleDto) {
    const updatedRidingRecord = await this.mongo.ridingRecord.update({
      where: { id: ridingRecordId },
      data: {
        route: {
          push: this.mongo.createGeoPoint(loc.lat, loc.lon, new Date(), loc.ele),
        },
      },
    });

    await this.setUserLocationToRedis(BigInt(updatedRidingRecord.recordOwnerId), loc.lat, loc.lon);

    return;
  }

  async setUserLocationToRedis(userId: bigint, lat: number, lon: number) {
    // redis는 ele를 지원하지 않음
    const member = REDIS.USER_LOCATION.MEMBER_KEY(userId);
    await this.redis.geoadd(REDIS.USER_LOCATION.COLLECTION_KEY, lon, lat, member);

    return;
  }

  // 사용자 ID를 받아서, 해당 사용자의 위치 정보를 가져오는 service
  async getUserLocation(userId: bigint): Promise<UserLocation | null> {
    const member = REDIS.USER_LOCATION.MEMBER_KEY(userId);
    const result = await this.redis.geopos(REDIS.USER_LOCATION.COLLECTION_KEY, member);

    if (result && result[0]) {
      const [lon, lat] = result[0];
      return { userId: userId.toString(), lat: parseFloat(lat), lon: parseFloat(lon) };
    }

    return null; // 위치 정보가 없는 경우
  }

  // teamId를 받아서, redis에 해당 팀이 라이딩을 시작한 것을 기록함
  // 생성된 riding record id를 반환함, 추후 요청 시에 사용
  async startTeamRiding(teamId: bigint, userId: bigint, loc: LatLonEleDto, departureName: string) {
    await this.redis.set(REDIS.CURRENT_RIDING_TEAM.KEY(teamId), 1);

    const teamMember = await this.teamUserService.getTeamMembers(teamId);

    const newRidingRecord = await this.mongo.ridingRecord.create({
      data: {
        recordOwnerId: userId.toString(),
        participants: teamMember,
        teamId: teamId.toString(),
        route: [this.mongo.createGeoPoint(loc.lat, loc.lon, new Date(), loc.ele)],
        departToArrival: [departureName],
      },
    });

    return newRidingRecord.id;
  }

  // 위치 정보를 제공받아서 RidingRecord에 지속적으로 추가하는 서비스
  // 이름을 함께 제공할 경우 경유지로 취급함, departToArrival 배열에 이름을 추가하도록 함
  async updateRidingRecordLocation(
    ridingRecordId: string,
    loc: LatLonEleDto,
    locationName?: string,
  ) {
    const updateData: any = {
      route: {
        push: this.mongo.createGeoPoint(loc.lat, loc.lon, new Date(), loc.ele),
      },
    };

    if (locationName) {
      updateData.departToArrival = {
        push: locationName,
      };
    }

    await this.mongo.ridingRecord.update({
      where: { id: ridingRecordId },
      data: updateData,
    });

    return;
  }

  // riding record id를 받아서, teamId를 추출해 redis의 현재 라이딩 중인 팀에서 제거합니다.
  // 또한, 라이딩 레코드를 마무리합니다.
  async endTeamRiding(ridingRecordId: string, loc: LatLonEleDto, locationName: string) {
    const ridingRecord = await this.mongo.ridingRecord.findUnique({
      where: { id: ridingRecordId },
    });

    // TODO: 커스텀 에러로 변환
    if (!ridingRecord) {
      throw new NotFoundException('RidingRecord ID 값에 해당하는 기록이 존재하지 않습니다.');
    }

    // 팀 라이딩인 경우 해당 팀을 라이딩 중인 상태에서 제거
    if (ridingRecord.teamId)
      await this.removeTeamFromRedisCurrentRidingTeam(BigInt(ridingRecord.teamId));

    // 라이딩 레코드 마무리 (예: 종료 시간 기록)
    await this.updateRidingRecordLocation(ridingRecordId, loc, locationName);

    return;
  }

  // teamId를 받아서, '라이딩 중인 팀'에서 제거함
  async removeTeamFromRedisCurrentRidingTeam(teamId: bigint) {
    const key = REDIS.CURRENT_RIDING_TEAM.KEY(teamId);
    await this.redis.del(key);

    // TODO: riding record를 생성할 필요가 있음.

    return;
  }

  // userId를 받아서, redis에서 active riding team을 가져옴
  async getUsersFromCurrentRidingTeam(userId: bigint) {
    const userTeamList = await this.teamUserService.getTeamList(userId);

    const ridingStatusChecks = await Promise.all(
      userTeamList.map(async (team) => {
        const member = REDIS.CURRENT_RIDING_TEAM.KEY(BigInt(team.id));
        const isRiding = await this.redis.exists(member);
        return { team, isRiding: isRiding === 1 };
      }),
    );

    const currentRidingTeam = ridingStatusChecks
      .filter(({ isRiding }) => isRiding)
      .map(({ team }) => team);

    const ridingMember = new Set<string>();

    // 추출된 라이딩 팀에서 모든 멤버의 userId를 Set에 추가 (중복 제거를 위함)
    for (const team of currentRidingTeam) {
      for (const member of team.members) {
        ridingMember.add(member.userId.toString());
      }
    }

    // Set을 Array로 변환하여 반환
    return Array.from(ridingMember);
  }

  // TODO: userId가 아니라 ridingRecordId로 부터 participant 가져와서 해당 사용자들 redis에서 위치 꺼내오는게 맞음

  // ridingRecordId 받아서, 해당 riding record의 participant들을 추출,
  // 해당 사용자들의 위치 반환, 위치가 없는 사용자는 제외함.
  async getLocationsFromRidingRecordId(ridingRecordId: string) {
    const ridingRecord = await this.mongo.ridingRecord.findUnique({
      where: { id: ridingRecordId },
    });

    if (!ridingRecord) {
      throw new NotFoundException('RidingRecord ID 값에 해당하는 기록이 존재하지 않습니다.');
    }

    const locations: UserLocation[] = [];
    for (const participantId of ridingRecord.participants) {
      const location = await this.getUserLocation(BigInt(participantId));
      if (location) {
        locations.push(location);
      }
    }

    return locations;
  }

  // userId 받아서, 해당 사용자가 속한 current riding team에서 member를 추출,
  // 해당 사용자들의 위치 반환, 위치가 없는 사용자는 제외함.
  async getLocationsFromUserIds(userId: bigint) {
    const ridingUserIds = await this.getUsersFromCurrentRidingTeam(userId);

    const locations: UserLocation[] = [];
    for (const ridingUserId of ridingUserIds) {
      const location = await this.getUserLocation(BigInt(ridingUserId));
      if (location) {
        locations.push(location);
      }
    }

    return locations;
  }

  // ================== TEST ============================

  generateFakeLocation(): LatLonEleDto {
    return {
      lat: faker.location.latitude(), // 위도
      lon: faker.location.longitude(), // 경도
    };
  }
}

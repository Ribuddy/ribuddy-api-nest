import { Injectable } from '@nestjs/common';

import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

import { REDIS } from '@common/constants/redis.constants';

import { UserLocation } from '@modules/driving/types/drive-location.types';
import { TeamUsersService } from '@modules/users/services/team.users.service';

@Injectable()
export class DriveLocationService {
  private redis: Redis;

  constructor(
    private readonly redisService: RedisService,
    private readonly teamUserService: TeamUsersService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async setUserLocation(userId: bigint, lat: number, lon: number) {
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
  async startTeamRiding(teamId: bigint) {
    await this.redis.set(REDIS.CURRENT_RIDING_TEAM.KEY(teamId), 1);

    return;
  }

  // teamId를 받아서, '라이딩 중인 팀'에서 제거함
  async endTeamRiding(teamId: bigint) {
    const key = REDIS.CURRENT_RIDING_TEAM.KEY(teamId);
    await this.redis.del(key);

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
}

import { Injectable } from '@nestjs/common';

import { CustomException } from '@common/codes/custom.exception';
import { UserErrorCode } from '@common/codes/error/user.error.code';

import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';
import { EditUserProfileRequestDto, GetUserInfoResponseDto } from '@modules/users/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: MySQLPrismaService) {}

  /**
   * 내 정보 조회
   */
  async getUserInfo(userId: bigint): Promise<GetUserInfoResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        ridingMember: true,
        teamMember: true,
      },
    });

    if (!user) {
      throw new CustomException(UserErrorCode.NO_USER);
    }

    return {
      id: user.id.toString(),
      name: user.name,
      nickname: user.nickname,
      introduction: user.oneLineIntroduction,
      createdAt: user.createdAt,
      teams: user.teamMember.map((tm) => tm.teamId.toString()),
      ridingRecords: user.ridingMember.map((rm) => rm.ridingRecordId.toString()),
    };
  }

  // userId 1이 userId 2와 함께 달린 횟수 조회
  async getRidingCountWithFriend(userId1: bigint, userId2: bigint): Promise<number> {
    const count = await this.prisma.ridingMember.count({
      where: {
        ridingRecord: {
          ridingMember: {
            some: {
              userId: userId2,
            },
          },
        },
        userId: userId1,
      },
    });

    return count;
  }

  // userId로 사용자 삭제
  async deleteUser(userId: bigint) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: userId },
    });

    return { ...deletedUser, id: deletedUser.id.toString() };
  }

  // 사용자 정보 수정
  async editUser(userId: bigint, partialUser: EditUserProfileRequestDto) {
    // remove undefined fields (cus of partial in DTO)
    const filteredData = Object.fromEntries(
      Object.entries(partialUser).filter(([_, v]) => v !== undefined),
    );

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: filteredData,
      });

      return { ...updatedUser, id: updatedUser.id.toString() };
    } catch (_err) {
      // throw _err;
      throw new CustomException(UserErrorCode.DUPLICATE_RIBUDDY_ID);
    }
  }

  // userId 두 개를 받아서 친구 추가
  async addFriend(fromUserId: bigint, toUserId: bigint) {
    if (fromUserId === toUserId) {
      throw new CustomException(UserErrorCode.CANNOT_ADD_SELF_AS_FRIEND);
    }

    // 이미 친구인지 확인
    const existingFriendship = await this.prisma.friend.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId,
        },
      },
    });

    if (existingFriendship) {
      throw new CustomException(UserErrorCode.ALREADY_FRIEND);
    }

    // 친구 추가
    await this.prisma.friend.create({
      data: {
        fromUserId,
        toUserId,
      },
    });

    return;
  }

  // 친구 삭제
  async deleteFriend(fromUserId: bigint, toUserId: bigint) {
    // 그냥 delete 쓰면 prisma error 발생하므로 deleteMany 사용
    const deleted = await this.prisma.friend.deleteMany({
      where: {
        fromUserId,
        toUserId,
      },
    });

    if (deleted.count === 0) {
      throw new CustomException(UserErrorCode.NOT_A_FRIEND);
    }

    return;
  }

  // 친구 즐겨찾기 상태 변경
  async changeFavoriteFriendStatus(fromUserId: bigint, toUserId: bigint, isFavorite: boolean) {
    try {
      await this.prisma.friend.update({
        where: {
          fromUserId_toUserId: {
            fromUserId,
            toUserId,
          },
        },
        data: {
          isFavorite,
        },
      });
      return;
    } catch (_err) {
      throw new CustomException(UserErrorCode.NOT_A_FRIEND);
    }
  }

  // ribuddyId로 userId 조회
  async getUserIdByRiBuddyId(ribuddyId: string) {
    const user = await this.prisma.user.findUnique({
      where: { ribuddyId },
    });

    if (!user) {
      throw new CustomException(UserErrorCode.NO_USER);
    }

    return user.id;
  }

  // 친구 목록 조회
  async getFriendList(userId: bigint) {
    const friends = await this.prisma.friend.findMany({
      where: { fromUserId: userId },
      include: {
        toUser: true,
      },
    });

    return friends.map((friend) => ({
      id: friend.toUser.id.toString(),
      name: friend.toUser.name,
      nickname: friend.toUser.nickname,
      ribuddyId: friend.toUser.ribuddyId,
      isFavorite: friend.isFavorite,
    }));
  }

  //
}

import { Injectable } from '@nestjs/common';

import { customAlphabet } from 'nanoid';

import { CustomException } from '@common/codes/custom.exception';
import { UserErrorCode } from '@common/codes/error/user.error.code';

import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';

@Injectable()
export class TeamUsersService {
  constructor(private readonly prisma: MySQLPrismaService) {}

  // userId를 받아서 해당 사용자가 가입되어 있는 모든 팀 정보 반환
  async getTeamList(userId: bigint) {
    // 모든 팀 조회
    const teams = await this.prisma.team.findMany({
      where: { members: { some: { userId } } },
      include: { members: true },
    });

    // bigint는 service 단에서 제거
    return teams.map((team) => ({
      ...team,
      id: team.id.toString(),
    }));
  }

  // isCrew: 크루는 영구 팀임, 그게 아니면 일회성 팀임.
  async makeTeam(isCrew: boolean, teamMembers: bigint[], name: string, description?: string) {
    // teamMember 안에 중복된 userId가 있는지 확인
    const uniqueMembers = new Set(teamMembers.map((id) => id.toString()));
    if (uniqueMembers.size !== teamMembers.length) {
      throw new CustomException(UserErrorCode.BAD_TEAM_CREATE_REQUEST);
    }

    // 팀 생성
    const newTeam = await this.prisma.team.create({
      data: {
        name,
        description,
        isCrew,
        members: {
          createMany: {
            data: teamMembers.map((memberId) => ({
              userId: memberId,
            })),
          },
        },
      },
      include: { members: true },
    });

    return newTeam.id.toString();
  }

  // 팀 참여
  async joinTeam(userId: bigint, teamId: bigint) {
    // 이미 팀의 사용자는 아닌지 확인 (팀에 속해있다가 탈퇴한 멤버 또한 보기)
    const existingMembership = await this.prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
        isCurrentMember: false,
      },
    });

    // 이미 존재하는 사용자면 경고 표시
    if (existingMembership) {
      throw new CustomException(UserErrorCode.ALREADY_IN_TEAM);
    }

    // 사용자 추가, 기존에 팀이였다가 탈퇴한 사용자는 update
    await this.prisma.teamMember.upsert({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      create: {
        teamId,
        userId,
        isCurrentMember: true,
      },
      update: {
        isCurrentMember: true,
      },
    });

    return;
  }

  async leaveTeam(userId: bigint, teamId: bigint) {
    // 이미 팀의 사용자인지 봄
    const membership = await this.prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    // 팀의 사용자가 아니거나, 팀을 탈퇴한 사용자일 경우
    if (!membership || !membership.isCurrentMember) {
      throw new CustomException(UserErrorCode.NOT_IN_TEAM);
    }

    // 시용자를 팀에서 제거 (soft delete)
    await this.prisma.teamMember.update({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
      data: {
        isCurrentMember: false,
      },
    });

    return;
  }

  // TODO: cron으로 만료된 코드를 삭제하는 로직이 필요함
  // TODO: 이거 redis로 변경
  async createTeamJoinCode(teamId: bigint) {
    // 6자리 영문 대문자 + 숫자 조합
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // 6자리 코드를 생성하는 함수를 만듭니다.
    const generateInviteCode = customAlphabet(characters, 6);

    // 코드 생성
    let newCode = generateInviteCode(); // 예: 'A4T1', 'K9V0'

    while (true) {
      // 중복 검사
      const existingCode = await this.prisma.teamJoinCode.findMany({
        where: { code: newCode },
      });

      if (!existingCode) {
        break; // 중복이 없으면 루프 종료
      }

      newCode = generateInviteCode(); // 중복이 있으면 새 코드 생성
    }

    // Save the code to the database with an expiration time (e.g., 1 hour)
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    try {
      await this.prisma.teamJoinCode.create({
        data: {
          teamId,
          code: newCode,
          expiresAt: expirationTime,
        },
      });
    } catch (__err) {
      throw new CustomException(UserErrorCode.FAILED_TO_CREATE_TEAM_JOIN_CODE);
    }

    return newCode;
  }

  async joinTeamByCode(userId: bigint, code: string) {
    // Find the team join code in the database
    const teamWithJoinCode = await this.prisma.teamJoinCode.findMany({
      where: { code },
    });

    if (!teamWithJoinCode || teamWithJoinCode.length > 1) {
      throw new CustomException(UserErrorCode.INVALID_TEAM_JOIN_CODE);
    }

    // Check if the code has expired
    if (teamWithJoinCode[0].expiresAt < new Date()) {
      throw new CustomException(UserErrorCode.EXPIRED_TEAM_JOIN_CODE);
    }

    // Add the user to the team
    await this.joinTeam(userId, teamWithJoinCode[0].teamId);

    return;
  }

  async isUserInTeam(userId: bigint, teamId: bigint) {
    const membership = await this.prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    if (!membership) {
      throw new CustomException(UserErrorCode.NOT_IN_TEAM);
    }

    return;
  }
}

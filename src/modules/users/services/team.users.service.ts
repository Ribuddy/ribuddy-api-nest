import { Injectable } from '@nestjs/common';

import { customAlphabet } from 'nanoid';

import { CustomException } from '@common/codes/custom.exception';
import { UserErrorCode } from '@common/codes/error/user.error.code';

import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';
import { TeamRole } from '@modules/users/dto/team.dto';

@Injectable()
export class TeamUsersService {
  constructor(private readonly prisma: MySQLPrismaService) {}

  async getTeamList(userId: bigint) {
    const teams = await this.prisma.team.findMany({
      where: { members: { some: { userId } } },
      include: { members: true },
    });

    return teams.map((team) => ({
      ...team,
      id: team.id.toString(),
    }));
  }

  async makeTeam(isCrew: boolean, teamMembers: bigint[], name: string, description?: string) {
    // teamMember 안에 중복된 userId가 있는지 확인
    const uniqueMembers = new Set(teamMembers.map((id) => id.toString()));
    if (uniqueMembers.size !== teamMembers.length) {
      throw new CustomException(UserErrorCode.BAD_TEAM_CREATE_REQUEST);
    }

    // Create a new team
    const newTeam = await this.prisma.team.create({
      data: {
        name,
        description,
        isCrew,
        members: {
          createMany: {
            data: teamMembers.map((memberId, index) => ({
              userId: memberId,
              role: index === 0 ? TeamRole.LEADER : TeamRole.MEMBER, // First member is the leader
            })),
          },
        },
      },
      include: { members: true },
    });

    return newTeam.id.toString();
  }

  async joinTeam(userId: bigint, teamId: bigint) {
    // Check if the user is already a member of the team
    const existingMembership = await this.prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    if (existingMembership) {
      throw new CustomException(UserErrorCode.ALREADY_IN_TEAM);
    }

    // Add the user to the team
    await this.prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role: TeamRole.MEMBER,
      },
    });

    return;
  }

  async joinMultipleUserToTeam(teamMembers: bigint[], teamId: bigint) {
    // Add multiple users to the team
    await this.prisma.teamMember.createMany({
      data: teamMembers.map((memberId) => ({
        teamId,
        userId: memberId,
        role: TeamRole.MEMBER,
      })),
      skipDuplicates: true, // Skip if the user is already a member
    });

    return;
  }

  async leaveTeam(userId: bigint, teamId: bigint) {
    // Check if the user is a member of the team
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

    // If the user is the leader, prevent leaving (or implement leader transfer logic)
    if (membership.role === TeamRole.LEADER) {
      // if the user is the only member, allow leaving and delete the team
      // TODO: docs, 사용자가 한 명일 경우 팀이 삭제되며 관련된 모든 자료는 삭제됩니다
      const teamMembers = await this.prisma.teamMember.findMany({
        where: { teamId },
      });

      if (teamMembers.length === 1) {
        await this.prisma.team.delete({
          where: { id: teamId },
        });
        return;
      }

      throw new CustomException(UserErrorCode.TEAM_LEADER_CANNOT_LEAVE);
    }

    // Remove the user from the team
    await this.prisma.teamMember.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });

    return;
  }

  // TODO: cron으로 만료된 코드를 삭제하는 로직이 필요함
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

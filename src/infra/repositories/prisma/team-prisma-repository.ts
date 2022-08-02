import { TeamRepository } from '@domain/repositories/team-repository'
import { PrismaClient } from '@prisma/client'
import { Team } from '@domain/entities/team'

export class TeamPrismaRepository implements TeamRepository {
  constructor(private prisma: PrismaClient) {}

  async save({ id, name, startDate, state }: Team): Promise<void> {
    await this.prisma.team.create({
      data: {
        id: id && id,
        name,
        start_date: startDate,
        state,
      },
    })
  }

  async getById(teamId: string): Promise<Team | undefined> {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } })
    if (team) {
      const { id, name, start_date, state } = team
      return new Team(id, name, start_date, state)
    }
  }

  async clear(): Promise<void> {
    await this.prisma.team.deleteMany({})
  }
}

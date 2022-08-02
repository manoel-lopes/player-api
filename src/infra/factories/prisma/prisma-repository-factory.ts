import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { TeamRepository } from '@domain/repositories/team-repository'
import { TeamPrismaRepository } from '@infra/repositories/prisma/team-prisma-repository'
import { PlayerRepository } from '@domain/repositories/player-repository'
import { PlayerPrismaRepository } from '@infra/repositories/prisma/player-prisma-repository'

export class PrismaRepositoryFactory implements RepositoryFactory {
  constructor(private prisma: PrismaClient) {}

  createTeamRepository(): TeamRepository {
    return new TeamPrismaRepository(this.prisma)
  }

  createPlayerRepository(): PlayerRepository {
    return new PlayerPrismaRepository(this.prisma)
  }
}

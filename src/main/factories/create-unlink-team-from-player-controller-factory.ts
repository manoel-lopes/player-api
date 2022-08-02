import { PrismaClient } from '@prisma/client'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { UnlinkTeamFromPlayerUseCase } from '@application/use-cases/unlink-team-from-player'
import { UnlinkTeamFromPlayerController } from '@infra/presentation/controllers/unlink-team-to-player-controller'

export const createUnlinkTeamFromPlayerControllerFactory = () => {
  const prisma = new PrismaClient()
  const repositoryFactory = new PrismaRepositoryFactory(prisma)
  const unlinkTeamFromPlayerUseCase = new UnlinkTeamFromPlayerUseCase(
    repositoryFactory
  )
  const unlinkTeamFromPlayerController = new UnlinkTeamFromPlayerController(
    unlinkTeamFromPlayerUseCase
  )
  return unlinkTeamFromPlayerController
}

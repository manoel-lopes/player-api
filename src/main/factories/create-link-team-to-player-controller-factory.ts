import { PrismaClient } from '@prisma/client'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { LinkTeamToPlayerUseCase } from '@application/use-cases/link-team-to-player'
import { LinkTeamToPlayerController } from '@infra/presentation/controllers/link-team-to-player-controller'

export const createLinkTeamToPlayerControllerFactory = () => {
  const prisma = new PrismaClient()
  const repositoryFactory = new PrismaRepositoryFactory(prisma)
  const linkTeamToPlayerUseCase = new LinkTeamToPlayerUseCase(repositoryFactory)
  const linkTeamToPlayerController = new LinkTeamToPlayerController(
    linkTeamToPlayerUseCase
  )
  return linkTeamToPlayerController
}

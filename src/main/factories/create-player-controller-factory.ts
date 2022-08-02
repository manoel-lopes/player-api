import { PrismaClient } from '@prisma/client'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreatePlayerUseCase } from '@application/use-cases/create-player-use-case'
import { CreatePlayerController } from '@infra/presentation/controllers/create-player-controller'

export const createPlayerControllerFactory = () => {
  const prisma = new PrismaClient()
  const repositoryFactory = new PrismaRepositoryFactory(prisma)
  const createPlayerUseCase = new CreatePlayerUseCase(repositoryFactory)
  const createPlayerController = new CreatePlayerController(createPlayerUseCase)
  return createPlayerController
}

import { PrismaClient } from '@prisma/client'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'
import { CreateTeamController } from '@infra/presentation/controllers/create-team-controller'

export const createTeamControllerFactory = () => {
  const prisma = new PrismaClient()
  const repositoryFactory = new PrismaRepositoryFactory(prisma)
  const createTeamUseCase = new CreateTeamUseCase(repositoryFactory)
  const createTeamController = new CreateTeamController(createTeamUseCase)
  return createTeamController
}

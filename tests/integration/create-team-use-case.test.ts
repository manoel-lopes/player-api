import { v4 as uuid } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'
import { GetTeamUseCase } from '@application/use-cases/get-team-use-case'

let repositoryFactory: RepositoryFactory
let createTeamUseCase: CreateTeamUseCase
let getTeamUseCase: GetTeamUseCase

beforeAll(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  createTeamUseCase = new CreateTeamUseCase(repositoryFactory)
  getTeamUseCase = new GetTeamUseCase(repositoryFactory)
  await repositoryFactory.createTeamRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createTeamRepository().clear()
})

it('Must create a team', async () => {
  const id = uuid()
  const startDate = new Date('2022-07-30')
  const teamA = {
    id,
    name: 'teamA',
    startDate,
    state: 'RJ',
  }
  await createTeamUseCase.execute(teamA)
  const team = await getTeamUseCase.execute(id)
  expect(team).toEqual(teamA)
})

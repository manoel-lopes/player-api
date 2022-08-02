import { v4 as uuid } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreatePlayerUseCase } from '@application/use-cases/create-player-use-case'
import { GetPlayerUseCase } from '@application/use-cases/get-player-use-case'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'

let repositoryFactory: RepositoryFactory
let createPlayerUseCase: CreatePlayerUseCase
let getPlayerUseCase: GetPlayerUseCase
let createTeamUseCase: CreateTeamUseCase

beforeAll(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  createPlayerUseCase = new CreatePlayerUseCase(repositoryFactory)
  getPlayerUseCase = new GetPlayerUseCase(repositoryFactory)
  createTeamUseCase = new CreateTeamUseCase(repositoryFactory)
  await repositoryFactory.createPlayerRepository().clear()
  await repositoryFactory.createTeamRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createPlayerRepository().clear()
  await repositoryFactory.createTeamRepository().clear()
})

it('Must create a player', async () => {
  const id = uuid()
  await createPlayerUseCase.execute({
    id,
    name: 'player1',
    position: 'atacante',
    height: 1.79,
    weight: 71.5,
  })

  const player = await getPlayerUseCase.execute(id)
  expect(player.id).toBe(id)
  expect(player.name).toBe('player1')
  expect(player.position).toBe('atacante')
  expect(player.height).toBe(1.79)
  expect(player.weight).toBe(71.5)
})


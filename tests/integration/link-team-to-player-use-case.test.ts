import { v4 as uuid } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'
import { CreatePlayerUseCase } from '@application/use-cases/create-player-use-case'
import { LinkTeamToPlayerUseCase } from '@application/use-cases/link-team-to-player'

let repositoryFactory: RepositoryFactory
let createTeamUseCase: CreateTeamUseCase
let createPlayerUseCase: CreatePlayerUseCase
let linkTeamToPlayerUseCase: LinkTeamToPlayerUseCase

beforeEach(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  createTeamUseCase = new CreateTeamUseCase(repositoryFactory)
  createPlayerUseCase = new CreatePlayerUseCase(repositoryFactory)
  linkTeamToPlayerUseCase = new LinkTeamToPlayerUseCase(repositoryFactory)
  await repositoryFactory.createTeamRepository().clear()
  await repositoryFactory.createPlayerRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createTeamRepository().clear()
  await repositoryFactory.createPlayerRepository().clear()
})

it('Must link a team to a player', async () => {
  const teamId = uuid()
  const playerId = uuid()
  const startDate = new Date('2022-07-31')
  const teamA = {
    id: teamId,
    name: 'teamA',
    startDate,
    state: 'SP',
  }
  await createTeamUseCase.execute(teamA)
  await createPlayerUseCase.execute({
    id: playerId,
    name: 'player2',
    position: 'zagueiro',
    height: 1.79,
    weight: 71.5,
  })

  const { team } = await linkTeamToPlayerUseCase.execute({
    playerId,
    teamId,
  })
  expect(team).toEqual(teamA)
})

it('Must not link a team to a player who already has a team', async () => {
  const playerId = uuid()
  const teamA = {
    id: uuid(),
    name: 'teamA',
    startDate: new Date('2022-08-01'),
    state: 'RJ',
  }
  const teamB = {
    id: uuid(),
    name: 'teamB',
    startDate: new Date('2022-07-27'),
    state: 'SP',
  }

  await createTeamUseCase.execute(teamA)
  await createTeamUseCase.execute(teamB)
  await createPlayerUseCase.execute({
    id: playerId,
    name: 'player1',
    position: 'atacante',
    height: 1.79,
    weight: 71.5,
  })

  await linkTeamToPlayerUseCase.execute({ playerId, teamId: teamA.id })
  await expect(
    linkTeamToPlayerUseCase.execute({ playerId, teamId: teamB.id })
  ).rejects.toThrow('Player already has a team')
})

it('Must not link a team to a inexistent player', async () => {
  expect(
    async () =>
      await linkTeamToPlayerUseCase.execute({
        playerId: uuid(),
        teamId: uuid(),
      })
  ).rejects.toThrow('Player not found')
})

it('Must not link a inexistent team to a player', async () => {
  const playerId = uuid()
  await createPlayerUseCase.execute({
    id: playerId,
    name: 'player1',
    position: 'atacante',
    height: 1.79,
    weight: 71.5,
  })

  expect(
    async () =>
      await linkTeamToPlayerUseCase.execute({ playerId, teamId: uuid() })
  ).rejects.toThrow('Team not found')
})

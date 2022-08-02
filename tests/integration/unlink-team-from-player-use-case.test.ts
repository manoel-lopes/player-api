import { v4 as uuid } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'
import { CreatePlayerUseCase } from '@application/use-cases/create-player-use-case'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'
import { LinkTeamToPlayerUseCase } from '@application/use-cases/link-team-to-player'
import { UnlinkTeamFromPlayerUseCase } from '@application/use-cases/unlink-team-from-player'

let repositoryFactory: RepositoryFactory
let createPlayerUseCase: CreatePlayerUseCase
let createTeamUseCase: CreateTeamUseCase
let linkTeamToPlayerUseCase: LinkTeamToPlayerUseCase
let unlinkTeamFromPlayerUseCase: UnlinkTeamFromPlayerUseCase

beforeEach(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  createPlayerUseCase = new CreatePlayerUseCase(repositoryFactory)
  createTeamUseCase = new CreateTeamUseCase(repositoryFactory)
  linkTeamToPlayerUseCase = new LinkTeamToPlayerUseCase(repositoryFactory)
  unlinkTeamFromPlayerUseCase = new UnlinkTeamFromPlayerUseCase(
    repositoryFactory
  )
  await repositoryFactory.createTeamRepository().clear()
  await repositoryFactory.createPlayerRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createTeamRepository().clear()
  await repositoryFactory.createPlayerRepository().clear()
})

it('Must unlink a team from a player', async () => {
  const playerId = uuid()
  const teamId = uuid()
  const teamStartDate = new Date('2022-08-01')
  const teamB = {
    id: teamId,
    name: 'teamB',
    startDate: teamStartDate,
    state: 'SP',
  }

  await createTeamUseCase.execute(teamB)
  await createPlayerUseCase.execute({
    id: playerId,
    name: 'player1',
    position: 'atacante',
    height: 1.79,
    weight: 71.5,
  })

  const prevPayer = await linkTeamToPlayerUseCase.execute({
    playerId,
    teamId,
  })
  const newPlayer = await unlinkTeamFromPlayerUseCase.execute({
    playerId,
  })

  expect(prevPayer.id).toBe(newPlayer.id)
  expect(prevPayer.name).toBe(newPlayer.name)
  expect(prevPayer.position).toBe(newPlayer.position)
  expect(prevPayer.height).toBe(newPlayer.height)
  expect(prevPayer.weight).toBe(newPlayer.weight)
  expect(newPlayer.team).toBeUndefined()
})

it('Must not unlink team from a inexistent player', () => {
  expect(
    async () =>
      await unlinkTeamFromPlayerUseCase.execute({
        playerId: uuid(),
      })
  ).rejects.toThrow('Player not found')
})

import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'

const url = 'http://localhost:3000/player'
let repositoryFactory: RepositoryFactory

beforeAll(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  await repositoryFactory.createPlayerRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createPlayerRepository().clear()
})

it('Mus create a player', async () => {
  const playerId = uuid()
  const response = await axios({
    url,
    method: 'post',
    data: {
      id: playerId,
      name: 'player1',
      position: 'atacante',
      height: 1.79,
      weight: 71.5,
    },
  })
  expect(response.status).toBe(201)
  const player = response.data
  expect(player.id).toBe(playerId)
  expect(player.name).toBe('player1')
  expect(player.position).toBe('atacante')
  expect(player.height).toBe(1.79)
  expect(player.weight).toBe(71.5)
})

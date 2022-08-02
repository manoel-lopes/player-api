import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { PrismaRepositoryFactory } from '@infra/factories/prisma/prisma-repository-factory'

const url = 'http://localhost:3000/team'
let repositoryFactory: RepositoryFactory

beforeAll(async () => {
  const prisma = new PrismaClient()
  repositoryFactory = new PrismaRepositoryFactory(prisma)
  await repositoryFactory.createTeamRepository().clear()
})

afterAll(async () => {
  await repositoryFactory.createTeamRepository().clear()
})

it('Mus create a team', async () => {
  const teamId = uuid()
  const startDate = new Date('2022-07-30')
  const response = await axios({
    url,
    method: 'post',
    data: {
      id: teamId,
      name: 'teamA',
      startDate,
      state: 'RJ',
    },
  })
  expect(response.status).toBe(201)
  const team = response.data
  expect(team.id).toBe(teamId)
  expect(team.name).toBe('teamA')
  expect(new Date(team.startDate).getTime()).toBe(startDate.getTime())
  expect(team.state).toBe('RJ')
})

import { v4 as uuid } from 'uuid'
import { Team } from '@domain/entities/team'

it('Must create a team', () => {
  const startDate = new Date('2022-07-29')
  const id = uuid()
  const team = new Team(id, 'teamA', startDate, 'RJ')
  expect(team.id).toBe(id)
  expect(team.name).toBe('teamA')
  expect(team.startDate.getTime()).toBe(startDate.getTime())
  expect(team.state).toBe('RJ')
})

it('Must not create a team with a invalid state', () => {
  const id = uuid()
  const startDate = new Date('2022-07-29')
  expect(() => new Team(id, 'teamA', startDate, 'State')).toThrow(
    'Invalid brazilian sate'
  )
})

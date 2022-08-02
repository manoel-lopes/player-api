import { v4 as uuid } from 'uuid'
import { Player } from '@domain/entities/player'

it('Must create a player', () => {
  const id = uuid()
  const player = new Player(id, 'player1', 'atacante', 1.79, 71.5)
  expect(player.id).toBe(id)
  expect(player.name).toBe('player1')
  expect(player.position).toBe('atacante')
  expect(player.height).toBe(1.79)
  expect(player.weight).toBe(71.5)
})

it('Must not create a player with a invalid state', () => {
  expect(() => new Player(uuid(), 'player1', 'arbitro', 70.0, 1.8)).toThrow(
    'Invalid player position'
  )
})

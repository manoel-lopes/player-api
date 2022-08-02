import { PlayerPosition } from '@domain/entities/player-position'

it('Must create a valid brazilian state', () => {
  const playerPosition = new PlayerPosition('atacante').value
  expect(playerPosition).toBe('atacante')
})

it('Must not create a brazilian state with empty value', () => {
  expect(() => new PlayerPosition('')).toThrow('Invalid player position')
})

it('Must not create a invalid brazilian state', () => {
  expect(() => new PlayerPosition('position')).toThrow('Invalid player position')
})

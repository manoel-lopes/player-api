import { BrazilianState } from '@domain/entities/brazilian-state'

it('Must create a valid brazilian state', () => {
  const brazilianState = new BrazilianState('RJ').value
  expect(brazilianState).toBe('RJ')
})

it('Must not create a brazilian state with empty value', () => {
  expect(() => new BrazilianState('')).toThrow(
    'Invalid brazilian sate'
  )
})

it('Must not create a invalid brazilian state', () => {
  expect(() => new BrazilianState('BH')).toThrow(
    'Invalid brazilian sate'
  )
})

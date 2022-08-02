import { BrazilianState } from './brazilian-state'

export class Team {
  readonly state: string
  constructor(
    readonly id: string,
    readonly name: string,
    readonly startDate: Date,
    state: string
  ) {
    this.state = new BrazilianState(state).value
  }
}

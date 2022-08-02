import { Team } from '@domain/entities/team'
import { PlayerPosition } from './player-position'

export class Player {
  readonly position: string
  constructor(
    readonly id: string,
    readonly name: string,
    position: string,
    readonly height: number,
    readonly weight: number,
    readonly team?: Team
  ) {
    this.position = new PlayerPosition(position).value
  }
}

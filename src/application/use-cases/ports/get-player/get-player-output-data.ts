import { Team } from '@domain/entities/team'

export class GetPlayerOutputData {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly position: string,
    readonly height: number,
    readonly weight: number,
    readonly team?: Team
  ) {}
}

import { Team } from '@domain/entities/team'

export interface TeamRepository {
  save(team: Team): Promise<void>
  getById(teamId: string): Promise<Team | undefined>
  clear(): Promise<void>
}

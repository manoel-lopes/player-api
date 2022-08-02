import { PlayerRepository } from '@domain/repositories/player-repository'
import { TeamRepository } from '@domain/repositories/team-repository'

export interface RepositoryFactory {
  createTeamRepository(): TeamRepository
  createPlayerRepository(): PlayerRepository
}

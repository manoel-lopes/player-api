import { PlayerRepository } from '@domain/repositories/player-repository'
import { TeamRepository } from '@domain/repositories/team-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { LinkTeamToPlayerInputData } from './ports/link-team-to-player/link-team-to-player-input-data'

export class LinkTeamToPlayerUseCase {
  private playerRepository: PlayerRepository
  private teamRepository: TeamRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.playerRepository = this.repositoryFactory.createPlayerRepository()
    this.teamRepository = this.repositoryFactory.createTeamRepository()
  }

  async execute({ playerId, teamId }: LinkTeamToPlayerInputData) {
    const player = await this.playerRepository.getById(playerId)
    if (!player) throw Error('Player not found')
    if (player.team) throw Error('Player already has a team')
    const playerTeam = await this.teamRepository.getById(teamId)
    if (!playerTeam) throw Error('Team not found')
    const newPlayer = await this.playerRepository.update({
      ...player,
      team: playerTeam,
    })
    return newPlayer
  }
}

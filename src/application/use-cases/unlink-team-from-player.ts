import { PlayerRepository } from '@domain/repositories/player-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { UnlinkTeamFromPlayerInputData } from './ports/unlink-team-from-player-use-case/unlink-team-from-player-use-case-input-data'

export class UnlinkTeamFromPlayerUseCase {
  private playerRepository: PlayerRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.playerRepository = this.repositoryFactory.createPlayerRepository()
  }

  async execute({ playerId }: UnlinkTeamFromPlayerInputData) {
    const player = await this.playerRepository.getById(playerId)
    if (!player) throw Error('Player not found')
    const newPlayer = await this.playerRepository.update({
      ...player,
      team: null,
    })
    return newPlayer
  }
}

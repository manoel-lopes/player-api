import { PlayerRepository } from '@domain/repositories/player-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { GetPlayerOutputData } from './ports/get-player/get-player-output-data'

export class GetPlayerUseCase {
  private playerRepository: PlayerRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.playerRepository = this.repositoryFactory.createPlayerRepository()
  }

  async execute(playerId: string): Promise<GetPlayerOutputData | undefined> {
    const player = await this.playerRepository.getById(playerId)
    return player
  }
}

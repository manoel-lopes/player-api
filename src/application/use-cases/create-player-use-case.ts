import { PlayerRepository } from '@domain/repositories/player-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { CreatePlayerInputData } from './ports/create-player/create-player-input-data'

export class CreatePlayerUseCase {
  private playerRepository: PlayerRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.playerRepository = this.repositoryFactory.createPlayerRepository()
  }

  async execute(player: CreatePlayerInputData) {
    await this.playerRepository.save(player)
  }
}

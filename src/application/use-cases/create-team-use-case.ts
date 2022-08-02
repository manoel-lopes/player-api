import { TeamRepository } from '@domain/repositories/team-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { CreateTeamInputData } from './ports/create-team/create-team-input-data'

export class CreateTeamUseCase {
  private teamRepository: TeamRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.teamRepository = this.repositoryFactory.createTeamRepository()
  }

  async execute(team: CreateTeamInputData) {
    await this.teamRepository.save(team)
  }
}

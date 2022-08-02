import { TeamRepository } from '@domain/repositories/team-repository'
import { RepositoryFactory } from '@domain/factories/repository-factory'
import { GetTeamOutputData } from './ports/get-team/get-team-output-data'

export class GetTeamUseCase {
  private teamRepository: TeamRepository
  constructor(private repositoryFactory: RepositoryFactory) {
    this.teamRepository = this.repositoryFactory.createTeamRepository()
  }

  async execute(playerId: string): Promise<GetTeamOutputData | undefined> {
    const team = await this.teamRepository.getById(playerId)
    return team
  }
}

import { v4 as uuid } from 'uuid'
import { HttpRequest, HttpResponse } from './ports/http'
import { CreateTeamUseCase } from '@application/use-cases/create-team-use-case'
import { BrazilianState } from '@domain/entities/brazilian-state'

export class CreateTeamController {
  constructor(private createTeamUseCase: CreateTeamUseCase) {}

  async handle(req: HttpRequest, resp: HttpResponse) {
    const { id = '', name = '', startDate = '', state = '' } = req.body
    if (!name || !startDate || !state) {
      return resp.status(404).json({
        error: `Field ${
          !name ? 'name' : !startDate ? 'startDate' : 'state'
        } is required`,
      })
    }

    try {
      const team = {
        id: id ? id : uuid(),
        name,
        startDate: new Date(startDate),
        state: new BrazilianState(state).value,
      }
      await this.createTeamUseCase.execute({ ...team })
      return resp.status(201).json({ ...team })
    } catch (err) {
      return resp.status(400).json({ error: err.message })
    }
  }
}

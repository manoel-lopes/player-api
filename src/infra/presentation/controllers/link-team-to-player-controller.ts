import { LinkTeamToPlayerUseCase } from '@application/use-cases/link-team-to-player'
import { HttpRequest, HttpResponse } from './ports/http'

export class LinkTeamToPlayerController {
  constructor(private linkTeamToPlayerUseCase: LinkTeamToPlayerUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse) {
    const { playerId = '', teamId = '' } = req.body
    if (!playerId || !teamId) {
      return res.status(404).json({
        error: `Field ${!playerId ? 'playerId' : 'teamId'} is required`,
      })
    }

    try {
      const newPlayer = await this.linkTeamToPlayerUseCase.execute({
        playerId,
        teamId,
      })
      return res.status(200).json({ ...newPlayer })
    } catch (err) {
      const statusCode = err.message.includes('not found') ? 404 : 400
      return res.status(statusCode).json({ error: err.message })
    }
  }
}

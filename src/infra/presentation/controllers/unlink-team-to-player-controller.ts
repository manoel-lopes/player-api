import { UnlinkTeamFromPlayerUseCase } from '@application/use-cases/unlink-team-from-player'
import { HttpRequest, HttpResponse } from './ports/http'

export class UnlinkTeamFromPlayerController {
  constructor(private unlinkTeamToPlayerUseCase: UnlinkTeamFromPlayerUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse) {
    const { playerId = '' } = req.body
    if (!playerId) {
      return res.status(404).json({
        error: 'Field playerId is required',
      })
    }

    try {
      const newPlayer = await this.unlinkTeamToPlayerUseCase.execute({
        playerId,
      })
      return res.status(200).json({ ...newPlayer })
    } catch (err) {
      const statusCode = err.message.includes('not found') ? 404 : 400
      return res.status(statusCode).json({ error: err.message })
    }
  }
}

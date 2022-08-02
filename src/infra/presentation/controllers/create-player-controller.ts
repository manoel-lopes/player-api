import { v4 as uuid } from 'uuid'
import { HttpRequest, HttpResponse } from './ports/http'
import { CreatePlayerUseCase } from '@application/use-cases/create-player-use-case'
import { PlayerPosition } from '@domain/entities/player-position'

export class CreatePlayerController {
  constructor(private createPlayerUseCase: CreatePlayerUseCase) {}

  async handle(req: HttpRequest, resp: HttpResponse) {
    const {
      id = '',
      name = '',
      position = '',
      height = 0,
      weight = 0,
    } = req.body
    if (!name || !position || !height || !weight) {
      return resp.status(404).json({
        error: `Field ${
          !name
            ? 'name'
            : !position
            ? 'position'
            : !height
            ? 'height'
            : 'weight'
        } is required`,
      })
    }

    try {
      const player = {
        id: id ? id : uuid(),
        name,
        position: new PlayerPosition(position).value,
        height,
        weight,
      }
      await this.createPlayerUseCase.execute({ ...player })
      return resp.status(201).json({ ...player })
    } catch (err) {
      return resp.status(400).json({ error: err.message })
    }
  }
}

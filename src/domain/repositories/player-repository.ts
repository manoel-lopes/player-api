import { Player } from '@domain/entities/player'

export interface PlayerRepository {
  save(player: Player): Promise<void>
  getById(playerId: string): Promise<Player | undefined>
  update(player: Player): Promise<Player>
  clear(): Promise<void>
}

import { PlayerRepository } from '@domain/repositories/player-repository'
import { PrismaClient } from '@prisma/client'
import { Player } from '@domain/entities/player'
import { Team } from '@domain/entities/team'

export class PlayerPrismaRepository implements PlayerRepository {
  constructor(private prisma: PrismaClient) {}

  async save({ id, name, position, height, weight }: Player): Promise<void> {
    const data = { id: id && id, name, position, height, weight }
    await this.prisma.player.create({ data })
  }

  async getById(playerId: string): Promise<Player | undefined> {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    })
    if (player) {
      const { id, name, position, height, weight, id_team } = player
      if (id_team) {
        const playerTeam = await this.prisma.team.findUnique({
          where: { id: id_team },
        })
        if (playerTeam) {
          return new Player(
            id,
            name,
            position,
            Number(height),
            Number(weight),
            new Team(
              playerTeam.id,
              playerTeam.name,
              playerTeam.start_date,
              playerTeam.state
            )
          )
        }
      }
      return new Player(id, name, position, Number(height), Number(weight))
    }
  }

  async update(player: Player): Promise<Player> {
    const { team, ...data } = player
    const newPlayer = await this.prisma.player.update({
      where: { id: player.id },
      data: { ...data, id_team: team && team.id },
    })

    const playerTeam =
      newPlayer.id_team &&
      (await this.prisma.team.findUnique({
        where: { id: newPlayer.id_team },
      }))

    if (!playerTeam) {
      return new Player(
        newPlayer.id,
        newPlayer.name,
        newPlayer.position,
        Number(newPlayer.height),
        Number(newPlayer.weight)
      )
    }
    return new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.position,
      Number(newPlayer.height),
      Number(newPlayer.weight),
      new Team(
        playerTeam.id,
        playerTeam.name,
        playerTeam.start_date,
        playerTeam.state
      )
    )
  }

  async clear(): Promise<void> {
    await this.prisma.player.deleteMany({})
  }
}

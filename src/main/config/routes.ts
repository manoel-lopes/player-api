import { Router, Express, Request, Response } from 'express'
import { createTeamControllerFactory } from '../factories/create-team-controller-factory'
import { createPlayerControllerFactory } from '../factories/create-player-controller-factory'
import { createLinkTeamToPlayerControllerFactory } from '../factories/create-link-team-to-player-controller-factory'
import { createUnlinkTeamFromPlayerControllerFactory } from '../factories/create-unlink-team-from-player-controller-factory'

export const setRoutes = (app: Express) => {
  const router = Router()
  const createTeamController = createTeamControllerFactory()
  const createPlayerController = createPlayerControllerFactory()
  const createLinkTeamToPlayerController =
    createLinkTeamToPlayerControllerFactory()
  const createUnlinkTeamFromPlayerController =
    createUnlinkTeamFromPlayerControllerFactory()
  
  router.post('/team', async (req: Request, res: Response) => {
    return await createTeamController.handle(req, res)
  })

  router.post('/player', async (req: Request, res: Response) => {
    return await createPlayerController.handle(req, res)
  })

  router.put('/link-team-to-player', async (req: Request, res: Response) => {
    return await createLinkTeamToPlayerController.handle(req, res)
  })

  router.put('/unlink-team-from-player', async (req: Request, res: Response) => {
    return await createUnlinkTeamFromPlayerController.handle(req, res)
  })

  app.use(router)
}

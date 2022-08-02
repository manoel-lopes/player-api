import 'express-async-errors'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'

export const setMiddlewares = (app: Express) => {
  app.use(cors())
  app.use(express.json())
}

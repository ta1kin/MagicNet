import { Router } from 'express'
import { protect } from '../middlewares/auth.middleware'
import settingsController from './config.controller'


const configRouter = Router()

configRouter.use( protect )

configRouter.put( '/config', settingsController.updateSettings )

export default configRouter
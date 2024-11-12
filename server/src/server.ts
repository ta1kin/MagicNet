import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import homeRouter from './app/home/home.router'
import authRouter from './app/auth/auth.router'
import settingsRouter from './app/settings/settings.router'
import dataRouter from './app/data/data.router'
import infoRouter from './app/info/info.router'

import {
  PORT,
  HOST,
  isDev
} from './config/config.server'

import { prisma } from './app/prisma'
import { redis } from './app/redis'
import { notFound, errorHandler } from './app/middlewares/error.middleware'


const start = async () => {
  const app = express()

  app.use( express.json() )
  app.use( cookieParser() )
  app.use( helmet() )

  if( isDev ) app.use( morgan( 'dev' ) )
  if( isDev ) app.use( cors() )

  app.use( '/api', homeRouter )
  app.use( '/api/auth', authRouter )
  app.use( '/api', settingsRouter )
  app.use( '/api', dataRouter )
  app.use( '/api', infoRouter )

  app.use( notFound )
  app.use( errorHandler )


  app.listen( PORT, HOST, () => {
    console.log( `\n🚀 Сервер запущен по адресу: http://${ HOST }:${ PORT }/api\n` )
  } )
}

start()
  .then( async () => {
    await prisma.$disconnect()
  })
  .catch( async err => {
    console.debug( err )
    await prisma.$disconnect
    await redis.quit
    process.exit( 1 )
  })
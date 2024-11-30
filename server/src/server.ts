import express from 'express'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import homeRouter from './app/home/home.router'
import authRouter from './app/auth/auth.router'
import configRouter from './app/config/config.router'
import infoRouter from './app/info/info.router'
import docsRouter from './app/docs/docs.router'

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

  app.use( express.static('./src/public/data') )
  app.use( express.json() )
  app.use( cookieParser() )
  app.use( helmet() )

  if( isDev ) app.use( morgan( 'dev' ) )
  if( isDev ) app.use( cors() )

  app.use( fileUpload() )

  app.use( '/', homeRouter )
  app.use( '/auth', authRouter )
  app.use( '/', configRouter )
  app.use( '/', infoRouter )
  app.use( '/', docsRouter )

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
    console.error("Ошибка при старте сервера:", err);
    await prisma.$disconnect
    await redis.quit
    process.exit( 1 )
  })
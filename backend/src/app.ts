import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import passportHttp from './passport/passport-http'
import passportJwt from './passport/passport.jwt'
import passport from 'passport'
import session from 'express-session'

import authRoutes from './routes/auth.routes'
import glossaryRoutes from './routes/glossary.routes'
import wordRoutes from './routes/word.routes'
config()

export class App {
  public app: express.Application
  constructor () {
    this.app = express()
    this.app.set('port', process.env.PORT || 8000)

    // Database
    this.connectDatabase()

    // Middlewares
    passportHttp()
    passportJwt()
    config()
    this.appMiddlewares()
    this.appCors()
    this.appRoutes()
  }

  appMiddlewares () {
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }

  appCors () {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
      next()
    })
  }

  appRoutes () {
    this.app.use('/auth/', authRoutes)
    this.app.use('/glossary/', glossaryRoutes)
    this.app.use('/word/', wordRoutes)
  }

  connectDatabase () {
    try {
      mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }, (err: Error) => {
        if (!err) {
          console.log('Database connected')
        } else {
          console.log('Error to database error:', err)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default App

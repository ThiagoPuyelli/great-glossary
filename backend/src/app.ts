import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

export class App {
  public app: express.Application
  constructor () {
    this.app = express()
    this.app.set('port', process.env.PORT || 8000)

    // Database
    this.connectDatabase()

    // Middlewares
    config()
    this.appMiddlewares()
    this.appCors()
  }

  appMiddlewares () {
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
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

  connectDatabase () {
    try {
      mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
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

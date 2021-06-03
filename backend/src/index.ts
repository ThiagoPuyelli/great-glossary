import { App } from './app'
import { Application } from 'express'

const app: Application = new App().app

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')))

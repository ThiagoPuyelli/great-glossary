import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import User from '../models/User'
import { config } from 'dotenv'
config()

export default () => {
  passport.use('token', new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PASSWORD
  }, async (payload, done) => {
    let user: any = await User.findById(payload.id)

    if (!user) {
      return done('Error to authorize user', false)
    }

    if (user.toObject) {
      user = user.toObject()
      user.password = undefined
    }

    return done(null, user)
  }))
}

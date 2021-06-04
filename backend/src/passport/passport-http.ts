import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import User from '../models/User'

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })

  passport.use('login', new BasicStrategy(async (email, password, done) => {
    try {
      let user: any = await User.findOne({ email })

      if (!user) {
        return done(false)
      }

      const validate: boolean = await user.comparePasswords(password)

      if (!validate) {
        return done(false)
      }

      if (user.toObject) {
        user = user.toObject()
        user.password = undefined
      }

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }))
}

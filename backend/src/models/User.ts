import { model, Document, Schema } from 'mongoose'
import UserInterface from '../interfaces/UserInterface'
import bcrypt from 'bcryptjs'
import { NextFunction } from 'express'

const userSchema = new Schema<UserInterface & Document>({
  name: {
    type: String,
    required: true,
    maxLength: 30
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  },
  codePassword: {
    type: {
      code: {
        type: String,
        required: true
      },
      date: {
        type: Number,
        date: Date.now() + 3600000
      }
    }
  },
  glossaries: {
    type: [{
      title: {
        type: String,
        required: true,
        maxLength: 50
      },
      words: {
        type: [{
          _id: false,
          word: {
            type: String,
            required: true,
            maxLength: 30
          },
          definition: {
            type: String,
            required: true,
            maxLength: 400
          }
        }],
        default: []
      }
    }],
    default: []
  }
}, {
  versionKey: false
})

userSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next()

  try {
    const passwordHased = await bcrypt.hash(this.password, 10)
    this.password = passwordHased
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePasswords = async function (password: string) {
  try {
    const comparePassword = await bcrypt.compare(password, this.password)
    return comparePassword
  } catch (err) {
    return false
  }
}

export default model<UserInterface>('User', userSchema)

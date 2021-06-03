import { model, Document, Schema } from 'mongoose'
import UserInterface from '../interfaces/UserInterface'

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
})

export default model<UserInterface>('User', userSchema)

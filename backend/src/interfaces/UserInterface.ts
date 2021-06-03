export interface WordInterface {
  word: string,
  definition: string
}

export interface GlossaryInterface {
  _id?: string,
  title: string,
  words: WordInterface[]
}

interface UserInterface {
  _id?: string,
  email: string,
  name: string,
  lastname: string,
  password: string,
  glossaries: GlossaryInterface[]
}

export default UserInterface

export interface WordInterface {
  word: string;
  definition: string;
}

export interface GlossaryInterface {
  _id?: string;
  title: string;
  words: WordInterface[];
}

export interface CodePasswordInterface {
  code: string;
  date: number;
}

interface UserInterface {
  _id?: string;
  email: string;
  name: string;
  lastname: string;
  password: string;
  glossaries: GlossaryInterface[];
  codePassword?: CodePasswordInterface;
  comparePasswords?: Function;
}

export default UserInterface

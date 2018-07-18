import { Language } from "../language/language.interface";

export interface Translation {
  _id: string,
  name: string,
  language: Language,
  text: string,
}

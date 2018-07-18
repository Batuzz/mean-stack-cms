import { Translation } from "../translation/translation.interface";

export interface Submenu {
  _id: string,
  name: string,
  sequence: number,
  url: string,
  translations: Translation[],
}

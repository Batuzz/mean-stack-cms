import {Translation} from "../translation/translation.interface";

export interface Image {
  _id: string,
  url: string,
  descriptions: Translation[],
  titles: Translation[],
}

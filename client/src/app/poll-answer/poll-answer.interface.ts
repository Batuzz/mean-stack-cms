import {Translation} from "../translation/translation.interface";

export interface PollAnswer {
  _id: string,
  name: string,
  translations: Translation[],
  color: string,
  hoverColor: string
}

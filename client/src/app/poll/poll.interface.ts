import {Translation} from "../translation/translation.interface";
import {PollQuestion} from "../poll-question/poll-question.interface";

export interface Poll {
  _id: string,
  name: string,
  translations: Translation[],
  questions: PollQuestion[]
}

import {PollAnswer} from "../poll-answer/poll-answer.interface";
import {Translation} from "../translation/translation.interface";

export interface PollQuestion {
  _id: string,
  name: string,
  translations: Translation[],
  answerOptions: PollAnswer[],
}

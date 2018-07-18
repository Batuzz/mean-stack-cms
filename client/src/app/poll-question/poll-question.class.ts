import {Translation} from "../translation/translation.interface";
import {PollAnswer} from "../poll-answer/poll-answer.interface";

export class PollQuestion {
  public _id: string;
  public name: string;
  public translations: Translation[];
  public answerOptions: PollAnswer[];
}

import {Translation} from "../translation/translation.interface";
import {PollQuestion} from "../poll-question/poll-question.interface";

export class Poll {
  public name: string;
  public translations: Translation[];
  public questions: PollQuestion[];
}

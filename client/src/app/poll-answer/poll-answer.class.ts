import { Translation } from "../translation/translation.interface";

export class PollAnswer {
  public _id: string;
  public name: string;
  public translations: Translation[];
  public color: string;
  public hoverColor: string;
}

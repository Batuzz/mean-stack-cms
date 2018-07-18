import {Translation} from "../translation/translation.interface";

export class Image {
  public _id: string;
  public url: string;
  public descriptions: Translation[];
  public titles: Translation[];
}

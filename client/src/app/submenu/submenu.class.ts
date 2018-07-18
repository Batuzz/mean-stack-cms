import {Translation} from "../translation/translation.interface";

export class Submenu {
  public _id: string;
  public name: string;
  public sequence: number;
  public url: string;
  public translations: Translation[];
}

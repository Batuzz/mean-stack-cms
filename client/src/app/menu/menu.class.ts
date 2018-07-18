import {Translation} from "../translation/translation.interface";
import {Submenu} from "../submenu/submenu.interface";

export class Menu {
  public _id: string;
  public name: string;
  public sequence: number;
  public url: string;
  public translations: Translation[];
  public submenus: Submenu[];
}

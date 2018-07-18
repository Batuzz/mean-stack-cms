import {Translation} from "../translation/translation.interface";
import {Submenu} from "../submenu/submenu.interface";

export interface Menu {
  _id: string,
  name: string,
  sequence: number,
  translations: Translation[],
  url: string,
  submenus: Submenu[]
}

import { Translation } from "../translation/translation.interface";
import { Image } from "../image/image.interface";

export class Section {
  public name: string;
  public sequence: number;
  public translations: Translation[];
  public image: Image;
}

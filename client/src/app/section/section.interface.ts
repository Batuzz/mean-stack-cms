import { Translation } from "../translation/translation.class";
import { Image } from "../image/image.interface";

export interface Section {
  _id: string,
  name: string,
  sequence: number,
  translations: Translation[],
  image: Image
}

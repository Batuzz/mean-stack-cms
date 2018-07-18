import { Translation } from "../translation/translation.interface";
import { Section } from "../section/section.interface";

export interface Article {
  _id: string,
  name: string,
  translations: Translation[],
  sections: Section[]
}

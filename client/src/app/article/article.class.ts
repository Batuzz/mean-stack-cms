import { Translation } from "../translation/translation.interface";
import { Section } from "../section/section.interface";

export class Article {
  public _id: string;
  public name: string;
  public translations: Translation[];
  public sections: Section[];
}

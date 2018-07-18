import { PipeTransform, Pipe } from '@angular/core';
import {Translation} from "./translation.interface";

@Pipe({
  name:'filterTranslationByName'
})

export class TranslationFilterPipe implements PipeTransform {

  transform(value: Translation[], filterBy: string): Translation[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (translation: Translation) =>
        translation.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

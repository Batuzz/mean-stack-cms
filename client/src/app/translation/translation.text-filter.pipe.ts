import { PipeTransform, Pipe } from '@angular/core';
import { Translation } from "./translation.interface";

@Pipe({
  name:'filterTranslationByText'
})

export class TranslationTextFilterPipe implements PipeTransform {

  transform(value: Translation[], filterBy: string): Translation[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (translation: Translation) =>
        translation.text.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

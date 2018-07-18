import { PipeTransform, Pipe } from '@angular/core';
import { Language } from './language.interface'

@Pipe({
  name:'languagesFilterPipe'
})

export class LanguagesFilterPipe implements PipeTransform {

  transform(value: Language[], filterBy: string): Language[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (language: Language) =>
        language.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

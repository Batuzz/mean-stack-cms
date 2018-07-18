import { PipeTransform, Pipe } from '@angular/core';
import { Menu } from "./menu.interface";

@Pipe({
  name:'filterMenuByURL'
})

export class MenuURLFilterPipe implements PipeTransform {

  transform(value: Menu[], filterBy: string): Menu[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (menu: Menu) =>
        menu.url.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

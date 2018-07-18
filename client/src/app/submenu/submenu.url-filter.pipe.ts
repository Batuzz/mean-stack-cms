import { PipeTransform, Pipe } from '@angular/core';
import { Submenu } from "../submenu/submenu.interface";

@Pipe({
  name:'filterSubmenuByURL'
})

export class SubmenuURLFilterPipe implements PipeTransform {

  transform(value: Submenu[], filterBy: string): Submenu[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (submenu: Submenu) =>
        submenu.url.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

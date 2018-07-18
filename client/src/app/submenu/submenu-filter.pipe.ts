import { PipeTransform, Pipe } from '@angular/core';
import {Submenu} from "./submenu.interface";

@Pipe({
  name:'submenuFilterPipe'
})

export class SubmenuFilterPipe implements PipeTransform {

  transform(value: Submenu[], filterBy: string): Submenu[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (submenu: Submenu) =>
        submenu.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

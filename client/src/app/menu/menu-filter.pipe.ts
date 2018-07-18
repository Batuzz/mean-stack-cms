import { PipeTransform, Pipe } from '@angular/core';
import { Menu} from "./menu.interface";

@Pipe({
  name:'menuFilterPipe'
})

export class MenuFilterPipe implements PipeTransform {

  transform(value: Menu[], filterBy: string): Menu[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (menu: Menu) =>
        menu.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

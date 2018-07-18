import { PipeTransform, Pipe } from '@angular/core';
import {Poll} from "./poll.interface";

@Pipe({
  name:'pollFilterPipe'
})

export class PollFilterPipe implements PipeTransform {

  transform(value: Poll[], filterBy: string): Poll[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (poll: Poll) =>
        poll.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

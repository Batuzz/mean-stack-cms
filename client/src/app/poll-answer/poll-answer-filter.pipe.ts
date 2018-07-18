import { PipeTransform, Pipe } from '@angular/core';
import {PollAnswer} from "./poll-answer.interface";

@Pipe({
  name:'pollAnswerFilterPipe'
})

export class PollAnswerFilterPipe implements PipeTransform {

  transform(value: PollAnswer[], filterBy: string): PollAnswer[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (pollAnswer: PollAnswer) =>
        pollAnswer.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

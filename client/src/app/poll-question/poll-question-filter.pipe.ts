import { PipeTransform, Pipe } from '@angular/core';
import {PollQuestion} from "./poll-question.interface";

@Pipe({
  name:'pollQuestionFilterPipe'
})

export class PollQuestionFilterPipe implements PipeTransform {

  transform(value: PollQuestion[], filterBy: string): PollQuestion[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(
      (pollQuestion: PollQuestion) =>
        pollQuestion.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    ) : value;
  }

}

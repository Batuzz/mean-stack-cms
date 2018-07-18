import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { PollQuestion } from "../poll-question.interface";
import { PollQuestionService } from "../poll-question.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-question-list',
  templateUrl: './poll-question-list.component.html',
  styleUrls: ['./poll-question-list.component.scss']
})
export class PollQuestionListComponent implements OnInit {

  public pollQuestions: PollQuestion[];
  public pollQuestionFilter: string = '';
  public pollQuestionControl = new FormControl();
  constructor(
    private pollQuestionService: PollQuestionService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.pollQuestionService.getPollQuestions()
      .subscribe(
        pollQuestions => {
          this.pollQuestions = pollQuestions
        }, () =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Translation was successfully updated.'
          }),
      )
  }

  public removePollQuestion(id: string) {
    for(let element of this.pollQuestions) {
      this.pollQuestions = this.pollQuestions.filter(obj => obj._id != id);
    }
    this.pollQuestionService.removePollQuestion(id);
  }
}

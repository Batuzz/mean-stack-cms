import { Component, OnInit } from '@angular/core';
import { PollAnswer } from "../poll-answer.interface";
import { FormControl } from "@angular/forms";
import { PollAnswerService } from "../poll-answer.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-answer-list',
  templateUrl: './poll-answer-list.component.html',
  styleUrls: ['./poll-answer-list.component.scss']
})
export class PollAnswerListComponent implements OnInit {

  public pollAnswers: PollAnswer[];
  public pollAnswerFilter: string = '';
  public pollAnswerControl = new FormControl();

  constructor(
    private pollAnswerService: PollAnswerService,
    private messageService: MessageService,
  ) {
    this.pollAnswerService.getPollAnswers()
      .subscribe(
        pollAnswers => {
          this.pollAnswers = pollAnswers;
        }, () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting poll answers. Please try again.'
          })
      );
  }

  ngOnInit() {
  }

  public removePollAnswer(id: string) {
    for(let element of this.pollAnswers) {
      this.pollAnswers = this.pollAnswers.filter(obj => obj._id != id);
    }
    this.pollAnswerService.removePollAnswer(id);
  }
}

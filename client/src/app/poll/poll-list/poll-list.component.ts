import { Component, OnInit } from '@angular/core';
import { Poll } from "../poll.interface";
import { FormControl } from "@angular/forms";
import { PollService } from "../poll.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {

  public polls: Poll[];
  public pollFilter: string = '';
  public pollControl = new FormControl();

  constructor(
    private pollService: PollService,
    private messageService: MessageService
  ) {
    this.pollService.getPolls()
      .subscribe(
        polls => this.polls = polls,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting polls. Please try again.'
          })
      );
  }

  ngOnInit() { }

  public removePoll(id: string) {
    for(let element of this.polls) {
      this.polls = this.polls.filter(obj => obj._id != id);
    }
    this.pollService.removePoll(id);
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute, Router } from "@angular/router";
import { PollService } from "../poll.service";
import { Poll } from "../poll.interface";
import {TranslationService} from "../../translation/translation.service";

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PollViewComponent implements OnInit {

  public name: string;
  public poll: Poll;
  public answers: any[];
  public selectedAnswers;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private pollService: PollService,
    private router: Router,
    public ts: TranslationService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.name = params['name'];
        this.pollService.getPollByName(this.name)
          .subscribe(
            (poll) => {
              this.poll = poll;
              this.answers = [];
              this.selectedAnswers = {};

              for(let question of poll.questions) {
                this.selectedAnswers[question._id] = [];
                for(let answer of question.answerOptions) {
                  this.answers.push({
                    _id: answer._id,
                    label: answer.translations,
                    questionID: question._id
                  });
                }
              }
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll. Please refresh the website.'
              })
          )
      });
  }

  public sendPoll() {
    let answer = this.selectedAnswers;
    let answers = [];

    Object.getOwnPropertyNames(answer).forEach(function(val, idx, array) {
      answers.push({
        question: val,
        answer: answer[val]
      })
    });

    localStorage.setItem('answer-' + this.name, JSON.stringify(answers));

    this.pollService.savePoll(answers)
      .subscribe(
        () => this.router.navigate(['/chart/' + this.name]),
        () => this.router.navigate(['/chart/' + this.name])
      )
  }

}

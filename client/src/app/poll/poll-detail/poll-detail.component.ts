import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { Poll } from "../poll.interface";
import { PollQuestion } from "../../poll-question/poll-question.interface";
import { ActivatedRoute } from "@angular/router";
import { TranslationService } from "../../translation/translation.service";
import { PollQuestionService } from "../../poll-question/poll-question.service";
import { PollService } from "../poll.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {
  public selectedQuestions: any[] = [];
  public selectedTranslations: any[] = [];
  public id: string;
  public poll: Poll;
  public translations: Translation[];
  public pollForm: FormGroup;
  public questions: PollQuestion[];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pollService: PollService,
    public ts: TranslationService,
    private pollQuestionService: PollQuestionService,
    private messageService: MessageService
  ) {
    this.pollForm = formBuilder.group({
      name: [ null,[
        Validators.required
      ]],
    });
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.ts.getTranslations()
          .subscribe(
            translations => {
              this.pollService.getPoll(this.id)
                .subscribe(
                  poll => {
                    this.pollQuestionService.getPollQuestions()
                      .subscribe(
                        (pollQuestions) => {
                          this.poll = poll;
                          this.questions = pollQuestions;

                          this.selectedTranslations = poll.translations;
                          if (this.selectedTranslations && this.selectedTranslations.length)
                            for (let trans of this.selectedTranslations) {
                              translations = translations.filter(obj => obj._id != trans._id);
                            }
                          this.translations = translations;

                          if(poll.questions)
                            this.selectedQuestions = poll.questions;
                          else
                            this.selectedQuestions = [];

                          /*let questions = poll.questions;
                          if(this.selectedQuestions && this.selectedQuestions.length)
                            for(let trans of this.selectedQuestions) {
                              questions = questions.filter(obj => obj._id != trans._id);
                            }
                          this.questions = questions;*/

                          this.pollForm.setValue({
                            name: poll.name,
                          });
                        }
                      )
                  },
                  () =>
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error!',
                      detail: 'An error occurred while getting image. Please try again.'
                    })
                );
            }, () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translations. Please try again.'
              })
          );
        this.pollService.getPoll(this.id)
          .subscribe(
            poll => {
              this.poll = poll;
              this.pollForm.setValue({
                name: poll.name,
              });
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll. Please try again.'
              })
          );
      });
  }


  public updatePoll(values: any) {
    if(!this.pollForm.valid)
      return;

    this.poll.name = values.name;
    this.poll.questions = this.selectedQuestions;
    this.poll.translations = this.selectedTranslations;

    this.pollService.updatePoll(this.poll);
  }

}

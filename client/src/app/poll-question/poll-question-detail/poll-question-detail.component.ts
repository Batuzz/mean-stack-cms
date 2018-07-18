import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { PollAnswer } from "../../poll-answer/poll-answer.interface";
import { ActivatedRoute } from "@angular/router";
import { TranslationService } from "../../translation/translation.service";
import { PollQuestionService } from "../poll-question.service";
import { PollAnswerService } from "../../poll-answer/poll-answer.service";
import { PollQuestion } from "../poll-question.interface";
import { MessageService } from "primeng/components/common/messageservice";


@Component({
  selector: 'app-poll-question-detail',
  templateUrl: './poll-question-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-question-detail.component.scss']
})
export class PollQuestionDetailComponent implements OnInit {

  public id: string;
  public pollQuestion: PollQuestion;
  public translations: Translation[];
  public pollAnswers: PollAnswer[];
  public pollQuestionForm: FormGroup;
  private subscription: Subscription;
  public selectedAnswers: PollAnswer[]=[];
  public selectedTranslations: any[];
  public formControl: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private pollQuestionService: PollQuestionService,
    private pollAnswerService: PollAnswerService,
    private messageService: MessageService,
  ) {
    this.pollQuestionForm = formBuilder.group({
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
              this.pollQuestionService.getPollQuestion(this.id)
                .subscribe(
                  pollQuestion => {
                    this.pollQuestion = pollQuestion;
                    if(pollQuestion.translations)
                      this.selectedTranslations = pollQuestion.translations;
                    else
                      this.selectedTranslations = [];

                    if(this.selectedTranslations && this.selectedTranslations.length)
                      for(let trans of this.selectedTranslations) {
                        translations = translations.filter(obj => obj._id != trans._id);
                      }
                    this.translations = translations;

                    if(pollQuestion.answerOptions)
                      this.selectedAnswers = pollQuestion.answerOptions;
                    else
                      this.selectedAnswers = [];

                    let answers = pollQuestion.answerOptions;
                    if(this.selectedAnswers && this.selectedAnswers.length)
                      for(let trans of this.selectedAnswers) {
                        answers = answers.filter(obj => obj._id != trans._id);
                      }
                    this.pollAnswers = answers;

                    this.pollQuestionForm.setValue({
                      name: pollQuestion.name,
                    });
                  }, () =>
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error!',
                      detail: 'An error occurred while getting poll question. Please try again.'
                    }))
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translations. Please try again.'
              })
          );
        this.pollAnswerService.getPollAnswers()
          .subscribe(
            pollAnswers => {
              this.pollAnswers = pollAnswers;
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll answers. Please try again.'
              })
          );
        this.pollQuestionService.getPollQuestion(this.id)
          .subscribe(
            pollQuestion => {
              this.pollQuestion = pollQuestion;
              this.pollQuestionForm.setValue({
                name: pollQuestion.name,
              });
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll question. Please try again.'
              })
          );
      });
  }


  public updatePollQuestion(values: any) {
    if(!this.pollQuestionForm.valid)
      return;

    this.pollQuestion._id = this.id;
    this.pollQuestion.name = values.name;
    this.pollQuestion.translations = this.selectedTranslations;
    this.pollQuestion.answerOptions = this.selectedAnswers;

    this.pollQuestionService.updatePollQuestion(this.pollQuestion);
  }

}

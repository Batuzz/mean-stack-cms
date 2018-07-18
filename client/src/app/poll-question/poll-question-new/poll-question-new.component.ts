import { Component, OnInit } from '@angular/core';
import { PollQuestion } from "../poll-question.class";
import { PollAnswer } from "../../poll-answer/poll-answer.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { TranslationService } from "../../translation/translation.service";
import { PollAnswerService } from "../../poll-answer/poll-answer.service";
import { PollQuestionService } from "../poll-question.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-question-new',
  templateUrl: './poll-question-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-question-new.component.scss']
})
export class PollQuestionNewComponent implements OnInit {

  public pollQuestion: PollQuestion;
  public pollAnswers: PollAnswer[];
  public translations: Translation[];
  public selectedTranslations: Translation[] = [];
  public pollQuestionForm: FormGroup;
  public selectedAnswers: PollAnswer[] = [];


  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private pollAnswerService: PollAnswerService,
    private pollQuestionService: PollQuestionService,
    private messageService: MessageService,
  ) {
    this.pollQuestion = new PollQuestion();
    this.pollQuestionForm = formBuilder.group({
      name: [ null, [
        Validators.required,
        Validators.minLength(3)
      ]],
    });
    this.ts.getTranslations()
      .subscribe(
        translations => this.translations = translations,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      );
    this.pollAnswerService.getPollAnswers()
      .subscribe(
        pollAnswers => this.pollAnswers = pollAnswers,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting poll answers. Please try again.'
          })
      )
  }

  ngOnInit() {
  }

  public createPollQuestion(values: any) {
    if(!this.pollQuestionForm.valid)
      return;

    this.pollQuestion.name = values.name;
    this.pollQuestion.translations = this.selectedTranslations;
    this.pollQuestion.answerOptions = this.selectedAnswers;

    this.pollQuestionService.createPollQuestion(this.pollQuestion);
  }

}

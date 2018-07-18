import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { Poll } from "../poll.class";
import { PollQuestion } from "../../poll-question/poll-question.interface";
import { TranslationService } from "../../translation/translation.service";
import { PollService } from "../poll.service";
import { PollQuestionService } from "../../poll-question/poll-question.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-new',
  templateUrl: './poll-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-new.component.scss']
})
export class PollNewComponent implements OnInit {

  public poll: Poll;
  public translations: Translation[];
  public pollForm: FormGroup;
  public questions: PollQuestion[];
  public selectedTranslations: any[] = [];
  public selectedQuestions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private pollService: PollService,
    private pollQuestionService: PollQuestionService,
    private messageService: MessageService
  ) {
    this.poll = new Poll();
    this.pollForm = formBuilder.group({
      name: [ null, [
        Validators.required,
        Validators.minLength(3)
      ]]
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
    this.pollQuestionService.getPollQuestions()
      .subscribe(
        pollQuestions => this.questions = pollQuestions,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting poll questions. Please try again.'
          })
      )
  }

  ngOnInit() { }

  public createPoll(value: any) {
    if(!this.pollForm.valid)
      return;

    this.poll.name = value.name;
    this.poll.translations = this.selectedTranslations;
    this.poll.questions = this.selectedQuestions;

    this.pollService.createPoll(this.poll);
  }

}

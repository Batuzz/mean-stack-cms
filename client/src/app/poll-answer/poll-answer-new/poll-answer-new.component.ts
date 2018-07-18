import { Component, OnInit } from '@angular/core';
import { PollAnswer } from "../poll-answer.class";
import { Translation } from "../../translation/translation.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslationService } from "../../translation/translation.service";
import { PollAnswerService } from "../poll-answer.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-answer-new',
  templateUrl: './poll-answer-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-answer-new.component.scss']
})
export class PollAnswerNewComponent implements OnInit {
  public pollAnswer: PollAnswer;
  public translations: Translation[];
  public pollAnswerForm: FormGroup;
  public selectedTranslations: any[] = [];
  public color: string = '';
  public colorControl: FormControl = new FormControl();
  public colorControl2: FormControl = new FormControl();
  public hoverColor: string = '';
  public hoverColorControl: FormControl = new FormControl();
  public hoverColorControl2: FormControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private pollAnswerService: PollAnswerService,
    private messageService: MessageService,
  ) {
    this.pollAnswer = new PollAnswer();
    this.pollAnswerForm = formBuilder.group({
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
  }

  ngOnInit() { }

  public createPollAnswer(value: any) {
    if(!this.pollAnswerForm.valid)
      return;

    this.pollAnswer.name = value.name;
    this.pollAnswer.translations = this.selectedTranslations;
    this.pollAnswer.color = this.color;
    this.pollAnswer.hoverColor = this.hoverColor;

    this.pollAnswerService.createPollAnswer(this.pollAnswer);
  }

}

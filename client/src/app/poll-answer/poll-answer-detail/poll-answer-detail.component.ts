import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { PollAnswer } from "../poll-answer.interface";
import { ActivatedRoute } from "@angular/router";
import { TranslationService } from "../../translation/translation.service";
import { PollAnswerService } from "../poll-answer.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-poll-answer-detail',
  templateUrl: './poll-answer-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './poll-answer-detail.component.scss']
})
export class PollAnswerDetailComponent implements OnInit {

  public id: string;
  public pollAnswer: PollAnswer;
  public translations: Translation[];
  public pollAnswerForm: FormGroup;
  private subscription: Subscription;
  public selectedTranslations: any;

  public color: string;
  public colorControl: FormControl = new FormControl();
  public colorControl2: FormControl = new FormControl();
  public hoverColor: string;
  public hoverColorControl: FormControl = new FormControl();
  public hoverColorControl2: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    public pollAnswerService: PollAnswerService,
    private messageService: MessageService,
  ) {
    this.pollAnswerForm = formBuilder.group({
      name: [ null,[
        Validators.required,
        Validators.minLength(3)
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
              this.pollAnswerService.getPollAnswer(this.id)
                .subscribe(
                  pollAnswer => {
                    this.pollAnswer = pollAnswer;
                    this.color = (pollAnswer.color ? pollAnswer.color : '');
                    this.hoverColor = (pollAnswer.hoverColor ? pollAnswer.hoverColor : '');

                    this.selectedTranslations = pollAnswer.translations;
                    if (this.selectedTranslations && this.selectedTranslations.length)
                      for (let trans of this.selectedTranslations) {
                        translations = translations.filter(obj => obj._id != trans._id);
                      }
                    this.translations = translations;

                    this.pollAnswerForm.setValue({
                      name: pollAnswer.name,
                    });
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
        this.pollAnswerService.getPollAnswer(this.id)
          .subscribe(
            pollAnswer => {
              this.pollAnswer = pollAnswer;
              this.pollAnswerForm.setValue({
                name: pollAnswer.name,
              });
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting poll answer. Please try again.'
              })
          );
      });
  }

  public updatePollAnswer(value: any) {
    if(!this.pollAnswerForm.valid)
      return;

    this.pollAnswer._id = this.id;
    this.pollAnswer.name = value.name;
    this.pollAnswer.translations = this.selectedTranslations;
    this.pollAnswer.color = this.color;
    this.pollAnswer.hoverColor = this.hoverColor;

    this.pollAnswerService.updatePollAnswer(this.pollAnswer);
  }

}

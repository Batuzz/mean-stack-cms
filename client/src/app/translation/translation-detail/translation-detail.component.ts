import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslationService } from "../translation.service";
import { Subscription } from "rxjs/Subscription";
import { Translation } from "../translation.interface";
import { LanguageService } from "../../language/language.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-translation-detail',
  templateUrl: './translation-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './translation-detail.component.scss']
})
export class TranslationDetailComponent implements OnInit {

  public selectedTranslations: any[];
  public id: string;
  public text: string;
  public translation: Translation;
  public languages: any[];
  public selectedLanguage: any;
  public translationForm: FormGroup;
  private subscription: Subscription;
  public formControl: FormControl = new FormControl();
  public control: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private languageService: LanguageService,
    private messageService: MessageService
  ) {
    this.translationForm = formBuilder.group({
      name:  [ null, [
        Validators.required,
        Validators.minLength(2)
      ]],
    });
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.languageService.getLanguages()
          .subscribe(
            languages => {
              this.languages = [];
              for(let language of languages) {
                this.languages.push({
                  label: language.name,
                  value: language._id,
                })
              }
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting languages. Please try again.'
              })
          );
        this.translationService.getTranslation(this.id)
          .subscribe(
            translation => {
              this.translation = translation;
              this.selectedLanguage = translation.language._id;
              this.text = translation.text;
              this.translationForm.setValue({
                name: translation.name,
              })
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translation. Please try again.'
              })
          );
      });
  }

  public updateTranslation(values: any) {
    if(!this.translationForm.valid || !this.text || !this.text.length || !this.selectedLanguage)
      return;

    this.translation.name = values.name;
    this.translation.language = this.selectedLanguage;
    this.translation.text = this.text;

    this.translationService.updateTranslation(this.translation);
  }

}

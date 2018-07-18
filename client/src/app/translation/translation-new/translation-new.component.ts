import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslationService } from "../translation.service";
import { Translation } from "../translation.class";
import { Language } from "../../language/language.interface";
import { LanguageService } from "../../language/language.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-translation-new',
  templateUrl: './translation-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './translation-new.component.scss']
})
export class TranslationNewComponent implements OnInit {

  public translation: Translation;
  public text: string;
  public languages: Language[];
  public translationForm: FormGroup;
  public control: FormControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    public translationService: TranslationService,
    private languageService: LanguageService,
    private messageService: MessageService
  ) {
    this.translation = new Translation();
    this.translationForm = formBuilder.group({
      name: [ null, [
        Validators.required
      ]],
      language: [ null, null ],
    });
    this.languageService.getLanguages()
      .subscribe(
        languages => {
          this.languages = languages;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting languages. Please try again.'
          })
      );
  }

  ngOnInit() { }

  public createTranslation(value: any) {
    if(!this.translationForm.valid || !this.text || !this.text.length)
      return;

    this.translation.name = value.name;
    this.translation.language = value.language;
    this.translation.text = this.text;

    this.translationService.createTranslation(this.translation);
  }

}

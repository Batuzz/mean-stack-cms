import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "../language.service";
import { Language } from "../language.class";

@Component({
  selector: 'app-language-new',
  templateUrl: './language-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './language-new.component.scss']
})
export class LanguageNewComponent implements OnInit {
  public language: Language;
  public languageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
  ) {
    this.language = new Language();
    this.languageForm = formBuilder.group({
      iso:  [ null, [
        Validators.required,
        Validators.minLength(2)
      ]],
      name: [ null, [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  ngOnInit() { }

  public createLanguage(value: any) {
    if(!this.languageForm.valid)
      return;

    this.language.iso = value.iso;
    this.language.name = value.name;

    this.languageService.createLanguage(this.language);
  }

}

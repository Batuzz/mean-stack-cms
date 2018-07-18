import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Language } from "../language.interface";
import { LanguageService } from "../language.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-language-detail',
  templateUrl: './language-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './language-detail.component.scss']
})
export class LanguageDetailComponent implements OnInit {

  public id: string;
  public language: Language;
  public languageForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private messageService: MessageService
  ) {
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

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.languageService.getLanguage(this.id)
          .subscribe(
            language => {
              this.language = language;
              this.languageForm.setValue({
                iso: language.iso,
                name: language.name
              })
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting language. Please try again.'
              })
          );
    });
  }

  public updateLanguage() {
    if(!this.languageForm.valid)
      return;

    this.language.iso = this.languageForm.value.iso;
    this.language.name = this.languageForm.value.name;

    this.languageService.updateLanguage(this.language);
  }

}

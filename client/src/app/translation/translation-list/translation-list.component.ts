import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../translation.service";
import { Translation } from "../translation.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { FormControl } from "@angular/forms";
import { Language } from "../../language/language.interface";

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent implements OnInit {

  public translations: Translation[];
  public languages: Language[];
  public translationFilter: string = '';
  public translationLanguageFilter: string = '';
  public translationTextFilter: string = '';
  public translationControl = new FormControl();

  constructor(
    private translationService: TranslationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.translationService.getTranslations()
      .subscribe(
        translations => {
          this.translations = translations;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      );
  }

  public removeTranslation(id: string) {
    for(let element of this.translations) {
      this.translations = this.translations.filter(obj => obj._id != id);
    }
    this.translationService.removeTranslation(id);
  }
}

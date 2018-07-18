import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../language.service";
import { Language } from "../language.interface";
import { FormControl } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {

  public languages: Language[];
  public languageFilter: string = '';
  public languageControl = new FormControl();

  constructor(
    private languageService: LanguageService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
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


  public removeLanguage(id: string) {
    for(let element of this.languages) {
      this.languages = this.languages.filter(obj => obj._id != id);
    }
    this.languageService.removeLanguage(id);
  }

}

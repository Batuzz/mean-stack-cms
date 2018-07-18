import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Translation } from "./translation.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { isArray } from "rxjs/util/isArray";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class TranslationService {

  private languageISO: string;
  public translations: Translation[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.languageISO = localStorage.getItem('language');
    console.log('Translation service initialized');
    this.getTranslations().subscribe(
      (translations) =>
        this.translations = translations,
      () => {
        if(localStorage.getItem('user'))
          this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: 'An error occurred while getting translations'
           })
   })
  }

  public getTranslations(): Observable<Translation[]> {
    return this.http.get<Translation[]>(
      AppSettings.API_ENDPOINT + "translations"
    );
  }

  public getTranslationsByName(name: string): Observable<Translation[]> {
    return this.http.get<Translation[]>(
      AppSettings.API_ENDPOINT + "translations/name/"
    );
  }

  public getTranslation(id: string) {
    return this.http.get<Translation>(
      AppSettings.API_ENDPOINT + "translations/" + id
    );
  }


  public updateTranslation(translation: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "translations/" + translation._id,
      { translation: translation },
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Translation was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating translation. Please try again.'
        })
    );
  }


  public trans(translations: Translation[]) {
    if(!translations || !isArray(translations) || translations.length <= 0)
      return null;
    for(let trans of translations) {
      if(trans.language.iso === this.languageISO) {
        return trans.text;
      }
    }
    return translations[0].name;
  }


  public translateByName(translationName: string) {
    for(let trans of this.translations) {
      if(trans.name == translationName
        && trans.language.iso == this.languageISO) {
        return trans.text;
      }
    }
    return translationName;
  }


  public createTranslation(translation: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "translations",
      { translation: translation }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Translation was created successfully.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating translation. Please try again.'
        })
    )
  }


  public removeTranslation(id: string) {
    this.http.delete(
      AppSettings.API_ENDPOINT + "translations/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Translation was removed successfully.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing translation. Please try again.'
        })
    );
  }

  public removeTranslationByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "translations/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Translation was removed successfully.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing translation. Please try again.'
        })
    );
  }
}

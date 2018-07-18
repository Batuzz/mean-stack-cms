import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Language } from "./language.interface";
import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class LanguageService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    console.log('Language service initialized');
  }

  public getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(
      AppSettings.API_ENDPOINT + "languages"
    );
  }

  public getLanguage(id: string) {
    return this.http.get<Language>(
      AppSettings.API_ENDPOINT + "languages/" + id
    );
  }

  public updateLanguage(language: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "languages/" + language._id,
      { language: language },
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Language was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating language. Please try again.'
        })
    );
  }

  public createLanguage(language: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "languages",
      { language: language }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Language was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating language. Please try again.'
        })
    );
  }

  public removeLanguage(id: string) {
    this.http.delete(
      AppSettings.API_ENDPOINT + "languages/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Language was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing language. Please try again.'
        })
    );
  }

  public removeLanguageByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "languages/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Language was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing language. Please try again.'
        })
    );
  }
}

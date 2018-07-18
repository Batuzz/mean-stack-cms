import { Injectable } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Article } from "./article.interface";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class ArticleService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(
      AppSettings.API_ENDPOINT + "articles"
    );
  }

  public createArticle(article: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "articles",
      { article: article }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Article was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating article. Please try again.'
        })
    );
  }

  public getArticle(id: string) {
    return this.http.get<Article>(
      AppSettings.API_ENDPOINT + "articles/" + id
    );
  }

  public getArticleByName(name: string) {
    return this.http.get<Article>(
      AppSettings.API_ENDPOINT + "articles/name/" + name
    );
  }

  public updateArticle(article: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "articles/" + article._id,
      { article: article }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Article was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating article. Please try again.'
        })
    )
  }

  public removeArticle(id: string) {
    this.http.delete(
      AppSettings.API_ENDPOINT + "articles/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Article was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing article. Please try again.'
        })
    );
  }


  public removeArticleByName(name: string) {
      return this.http.delete(
        AppSettings.API_ENDPOINT + "articles/name/" + name,
      ).subscribe(
        () =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Article was successfully removed.'
          }),
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while removing article. Please try again.'
          })
      );
  }
}

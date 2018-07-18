import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { PollQuestion } from "./poll-question.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class PollQuestionService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    console.log("Poll Question service initialized");
  }

  public getPollQuestions(): Observable<PollQuestion[]> {
    return this.http.get<PollQuestion[]>(
      AppSettings.API_ENDPOINT + "poll/questions"
    );
  }

  public getPollQuestion(id: string): Observable<PollQuestion> {
    return this.http.get<PollQuestion>(
      AppSettings.API_ENDPOINT + "poll/questions/" + id
    );
  }

  public createPollQuestion(pollQuestion: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "poll/questions",
      { pollQuestion: pollQuestion }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll question was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating poll question. Please try again.'
        })
    );
  }

  public updatePollQuestion(pollQuestion: any) {
    this.http.put(
      AppSettings.API_ENDPOINT + "poll/questions/" + pollQuestion._id,
      { pollQuestion: pollQuestion }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll question was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating poll question. Please try again.'
        })
    );
  }

  public removePollQuestion(id: string) {
    this.http.delete(
      AppSettings.API_ENDPOINT + "poll/questions/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll question was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll question. Please try again.'
        })
    );
  }

  public removePollQuestionByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "poll/questions/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll question was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll question. Please try again.'
        })
    );
  }

}

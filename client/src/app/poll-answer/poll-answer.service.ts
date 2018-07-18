import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { PollAnswer } from "./poll-answer.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class PollAnswerService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    console.log("PollAnswer service initialized");
  }

  public getPollAnswers(): Observable<PollAnswer[]> {
    return this.http.get<PollAnswer[]>(
      AppSettings.API_ENDPOINT + "poll/answer/options"
    );
  }

  public getPollAnswer(id: string): Observable<PollAnswer> {
    return this.http.get<PollAnswer>(
      AppSettings.API_ENDPOINT + "poll/answer/options/" + id
    );
  }

  public createPollAnswer(pollAnswer: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "poll/answer/options",
      { pollAnswerOption: pollAnswer }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll answer was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating poll answer. Please try again.'
        })
    );
  }


  public updatePollAnswer(pollAnswer: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "poll/answer/options/" + pollAnswer._id,
      { pollAnswerOption: pollAnswer }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll answer was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating poll answer. Please try again.'
        })
    )
  }


  public removePollAnswer(id: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "poll/answer/options/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll answer was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll answer. Please try again.'
        })
    );
  }

  public removePollAnswerByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "poll/answer/options/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll answer was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll answer. Please try again.'
        })
    );
  }
}

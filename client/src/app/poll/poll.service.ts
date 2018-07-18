import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Poll } from "./poll.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class PollService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    console.log("Poll service initialized");
  }

  public getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(
      AppSettings.API_ENDPOINT + "polls"
    )
  }

  public getPoll(id: string) {
    return this.http.get<Poll>(
      AppSettings.API_ENDPOINT + "polls/" + id
    )
  }

  public createPoll(poll: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "polls",
      { poll: poll }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating poll. Please try again.'
        })
    );
  }

  public updatePoll(poll: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "polls/" + poll._id,
      { poll: poll }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating poll. Please try again.'
        })
    );
  }

  public removePoll(id: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "polls/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll. Please try again.'
        })
    );
  }

  public getPollByName(name: string) {
    return this.http.get<Poll>(
      AppSettings.API_ENDPOINT + "polls/name/" + name
    )
  }

  public removePollByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "polls/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll. Please try again.'
        })
    );
  }

  public savePoll(poll: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "poll/user/answers",
      { poll: poll }
    )/*.subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Poll was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing poll. Please try again.'
        })
    );*/
  }

  public getChartData(name: string) {
    return this.http.get<any[]>(
      AppSettings.API_ENDPOINT + "poll/user/answers/chart/" + name
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { Observable } from "rxjs/Observable";
import { Section } from "./section.interface";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class SectionService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  public getSections():Observable<Section[]> {
    return this.http.get<Section[]>(
      AppSettings.API_ENDPOINT + "sections"
    );
  }

  public getSection(id: string) {
    return this.http.get<Section>(
      AppSettings.API_ENDPOINT + "sections/" + id
    );
  }

  public createSection(section: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "sections",
      { section: section }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Section was created successfully.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating section. Please try again.'
        })
    )
  }

  public updateSection(section: Section) {
    this.http.put(
      AppSettings.API_ENDPOINT + "sections/" + section._id,
      { section: section }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Section was updated successfully.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating section. Please try again.'
        })
    )
  }

  public removeSecitonByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "sections/name/" + name,
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

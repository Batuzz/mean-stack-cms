import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Submenu } from "./submenu.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class SubmenuService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    console.log('Submenu service initialized');
  }

  public getSubmenus(): Observable<Submenu[]> {
    return this.http.get<Submenu[]>(
      AppSettings.API_ENDPOINT + "submenus"
    );
  }

  public getSubmenu(id: string) {
    return this.http.get<Submenu>(
      AppSettings.API_ENDPOINT + "submenus/" + id
    );
  }

  public removeSubmenu(id: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "submenus/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Submenu was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing submenu. Please try again.'
        })
    );
  }

  public createSubmenu(submenu: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "submenus",
      { submenu: submenu }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Submenu was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating submenu. Please try again.'
        })
    );
  }

  public updateSubmenu(submenu: any) {
    this.http.put(
      AppSettings.API_ENDPOINT + "submenus/" + submenu._id,
      { submenu: submenu }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Submenu was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating submenu. Please try again.'
        })
    );
  }

  public removeSubmenuByName(name: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "submenus/name/" + name,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Submenu was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing submenu. Please try again.'
        })
    );
  }
}

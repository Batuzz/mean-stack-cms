import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Menu } from "./menu.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class MenuService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    console.log('Menu service initialized');
  }

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(
      AppSettings.API_ENDPOINT + "menus"
    );
  }

  public getMenu(id: string) {
    return this.http.get<Menu>(
      AppSettings.API_ENDPOINT + "menus/" + id
    );
  }

  public createMenu(menu: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "menus",
      { menu: menu }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Menu was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating menu. Please try again.'
        })
    );
  }

  public updateMenu(menu: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "menus/" + menu._id,
      { menu: menu }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Menu was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating menu. Please try again.'
        })
    )
  }

  public removeMenu(id: any) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "menus/" + id
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Menu was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing menu. Please try again.'
        })
    )
  }

  public removeMenuByName(name: any) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "menus/name/" + name
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Menu was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing menu. Please try again.'
        })
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { User } from "./user.interface";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    console.log('User service initialized');
  }

  public login(user: any):any {
    return this.http.post<any>(
      AppSettings.API_ENDPOINT + 'users/login',
      { user: user }
      );
  }

  public logout() {
    localStorage.removeItem('user');
    this.messageService.add({
      severity: 'info',
      summary: 'Logged out',
      detail: 'See you soon!'
    });
  }

  public updateUser(user: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "users/" + user._id,
      { user: user }
    ).subscribe(
      (user: User) => {
        this.updateSessionUser(user);
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Your profile was updated successfully'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while updating your profile'
        })
      }
    );
  }

  private updateSessionUser(user: User) {
    let tmpUser = JSON.parse(localStorage.getItem('user'));

    tmpUser.email = user.email;
    tmpUser.username = user.username;
    tmpUser.imageURL = user.imageURL;

    localStorage.setItem('user', JSON.stringify(tmpUser));
  }
}

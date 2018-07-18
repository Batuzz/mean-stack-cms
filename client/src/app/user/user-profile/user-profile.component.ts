import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { User } from "../user.interface";
import { AppSettings } from "../../_helpers/app.settings";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['../../../assets/forms.scss', './user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userForm: FormGroup;
  public user: User;
  private imageURL: string;
  public appSettings: AppSettings = new AppSettings();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.imageURL = this.user.imageURL;
    this.userForm = formBuilder.group({
      username: [ this.user.username ,[
        Validators.required
      ]],
      email:  [ this.user.email, [
        Validators.required,
        Validators.email
      ]]
    });
  }

  ngOnInit(): void { }

  public onBasicUpload(event) {
    this.imageURL = event.xhr.response;
  }

  public updateUser(values: any) {

    if(!this.userForm.valid) {
      return;
    }

    this.user.username = values.username;
    this.user.email = values.email;
    this.user.imageURL = this.imageURL;

    this.userService.updateUser(this.user);
  }

}

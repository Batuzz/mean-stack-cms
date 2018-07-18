import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../../../assets/forms.scss']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;
  private returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = formBuilder.group({
      email: [ null, [
          Validators.required,
          Validators.email
      ]],
      password: [ null, [
          Validators.required,
          Validators.minLength(5)
      ]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login(values: any):void {
    this.loading = true;
    this.userService.login(values)
      .subscribe(
        user => {
          if (user && user.token) {
            localStorage.setItem('user', JSON.stringify(user));
            this.messageService.add({
              severity: 'success',
              summary: 'Logged in!',
              detail: 'Welcome back, ' + user.username + '!'
            });
          }
          // this.router.navigate([this.returnUrl]);
          location.replace(this.returnUrl);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'It seems like your credentials are wrong. Try again!'
          });
          this.loading = false;
        });
  }

}

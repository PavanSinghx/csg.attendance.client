import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import {
  CreateAccountOptions,
  UserOptions,
} from "../../interfaces/user-options";
import { AuthenticationService } from "../../providers/authentication.service";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupPage {
  submitted = false;

  createModel: CreateAccountOptions = {
    firstname: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  constructor(
    public router: Router,
    public userData: UserData,
    public auth: AuthenticationService,
    public api: ApiService,
    public loader: LoaderService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.CreateAccount();
    }
  }

  CreateAccount() {
    if (this.VerifyPassword()) {
      this.loader.simpleLoader();

      let createState = this.auth.CreateState(this.createModel);

      if (createState == null) {
        this.loader.dismissLoader();
        return;
      }

      createState
        .then((userInfo) => {
          this.auth.firebaseUserId = userInfo.user.uid;
          this.api.registerAccount(this.createModel).subscribe(
            (_) => {
              this.loader.dismissLoader();
              alert("Sign up successful!");
              this.router.navigateByUrl("/login");
            },
            (err) => {
              alert(err.message);
              this.loader.dismissLoader();
            }
          );
        })
        .catch((err) => {
          alert(err);
          this.loader.dismissLoader();
        });
    }
  }

  VerifyPassword(): boolean {
    if (this.createModel.password == this.createModel.confirmPassword) {
      if (this.createModel.password.length > 7) {
        if (
          this.createModel.password != null &&
          this.createModel.password != undefined
        ) {
          return true;
        } else {
          alert("Password cannot be empty!");
        }
      } else {
        alert("Password needs to 8 characters or more!");
      }
    } else {
      alert("Passwords do not match!");
    }
    return false;
  }

  signIn() {
    this.router.navigateByUrl("/login");
  }
}

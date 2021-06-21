import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { LoginOptions, UserOptions } from "../../interfaces/user-options";
import { AuthenticationService } from "../../providers/authentication.service";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: LoginOptions = { email: "", password: "" };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public auth: AuthenticationService,
    public api: ApiService,
    public loader: LoaderService
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;
    this.loader.simpleLoader();

    let loginState = this.auth.LoginState(this.login);

    if (loginState == null) {
      this.loader.dismissLoader();
      return;
    }

    if (form.valid) {
      loginState
        .then((userInfo) => {
          this.auth.firebaseUserId = userInfo.user.uid;
          this.api
            .getJwtAuthenticationToken()
            .subscribe(
              (res) => {
                this.loader.dismissLoader();
                alert("Sign in successful!");
                this.auth.jwtToken = res["token"];
                this.router.navigateByUrl("/home");
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

  onSignup() {
    this.router.navigateByUrl("/signup");
  }
}

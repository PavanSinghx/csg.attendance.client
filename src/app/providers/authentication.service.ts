import { ComponentFixture } from "@angular/core/testing";
import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

import { LoginOptions, CreateAccountOptions } from "../interfaces/user-options";
import firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private _auth: AngularFireAuth) {}

  firebaseUserId: string = "";

  jwtToken: string = "";

  LoginState(loginModel: LoginOptions): Promise<firebase.auth.UserCredential> {
    return this._auth.signInWithEmailAndPassword(
      loginModel.email,
      loginModel.password
    );
  }

  CreateState(
    accountModel: CreateAccountOptions
  ): Promise<firebase.auth.UserCredential> {
    return this._auth.createUserWithEmailAndPassword(
      accountModel.email,
      accountModel.password
    );
  }

  GenerateUserHash(name, id): string {
    return name + ":" + Math.random().toString(100).substring(5) + ":" + id;
  }
}
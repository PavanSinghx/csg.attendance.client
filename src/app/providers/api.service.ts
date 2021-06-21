import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CreateAccountOptions,
  CreateClassOptions,
  LoginOptions,
} from "../interfaces/user-options";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl = "https://localhost:44376/v1/";

  constructor(
    public httpClient: HttpClient,
    public auth: AuthenticationService
  ) {}

  registerAccount(account: CreateAccountOptions) {
    return this.httpClient.post(this.baseUrl + "authenticate", {
      firstnames: account.firstname,
      surname: account.surname,
      firebaseUserId: this.auth.firebaseUserId,
    });
  }

  getJwtAuthenticationToken() {
    return this.httpClient.get(
      this.baseUrl + "authenticate/firebaseid/" + this.auth.firebaseUserId
    );
  }

  getClassSummary() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.get(this.baseUrl + "class/summary", {
      headers: headers,
    });
  }

  getClassStudents(id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.get(this.baseUrl + "class/" + id, {
      headers: headers,
    });
  }

  getLearnersByTeacher() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.get(this.baseUrl + "student/", {
      headers: headers,
    });
  }

  getLearnersByStudentId(studentId, dateTime) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.get(
      this.baseUrl + "student/studentid/" + studentId + "/date/" + dateTime,
      {
        headers: headers,
      }
    );
  }

  deleteClassItem(id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.delete(this.baseUrl + "class/" + id, {
      headers: headers,
    });
  }

  addClassItem(createClass: CreateClassOptions) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.post(this.baseUrl + "class", createClass, {
      headers: headers,
    });
  }

  addLearnersItem(createLeaners) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.put(this.baseUrl + "class/classes", createLeaners, {
      headers: headers,
    });
  }

  addDailyGrades(dailyGrades) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.put(this.baseUrl + "student/grade", dailyGrades, {
      headers: headers,
    });
  }

  getPeriodGrades(id, start, end) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth.jwtToken}`,
    });
    return this.httpClient.get(
      this.baseUrl +
        "student/studentid/" +
        id +
        "/startdate/" +
        start +
        "/enddate/" +
        end +
        "/report",
      {
        headers: headers,
      }
    );
  }
}

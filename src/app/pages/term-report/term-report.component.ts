import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams } from "@ionic/angular";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: "app-term-report",
  templateUrl: "./term-report.component.html",
  styleUrls: ["./term-report.component.scss"],
})
export class TermReportComponent implements OnInit {
  studentId;
  startDate;
  endDate;
  studentList: any = [];

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    public modalCtrl: ModalController,
    private api: ApiService,
    private loader: LoaderService
  ) {
    this.studentId = this.params.data.studentId;
  }

  ngOnInit() {}

  cancel(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  async getGrades() {
    if (!this.verifyClass()) {
      return;
    }

    if (this.studentId.length == 0) {
      alert("Invalid student id.");
      return;
    }

    let createLoader = await this.loader.getSimpleLoader();
    createLoader.present();

    let startIsoDate = new Date(this.startDate).toISOString();
    let endIsoDate = new Date(this.endDate).toISOString();

    this.api
      .getPeriodGrades(this.studentId, startIsoDate, endIsoDate)
      .subscribe(
        (res) => {
          console.log(res);
          
          this.studentList = res;
        },
        (err) => {
          alert(err.message);
          createLoader.dismiss();
        },
        () => {
          createLoader.dismiss();
        }
      );
  }

  verifyClass() {
    if (this.startDate == "") {
      alert("Please ensure that you add a valid start time!");
      return false;
    }

    if (this.endDate == "") {
      alert("Please ensure that you add a valid end time!");
      return false;
    }

    let startIndex = this.startDate.substring(0, this.startDate.indexOf(":"));
    let endIndex = this.endDate.substring(0, this.endDate.indexOf(":"));

    if (endIndex <= startIndex) {
      alert("Start time cannot be greater than or equal to end time!");
      return false;
    }

    return true;
  }
}

import { Component, OnInit } from "@angular/core";
import { ModalController, NavController, NavParams } from "@ionic/angular";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";
import { TermReportComponent } from "../term-report/term-report.component";

@Component({
  selector: "app-daily-report-student",
  templateUrl: "./daily-report-student.component.html",
  styleUrls: ["./daily-report-student.component.scss"],
})
export class DailyReportStudentComponent implements OnInit {
  studentId;

  studentReport = {
    date: "",
  };

  constructor(
    private navCtrl: NavController,
    private params: NavParams,

    public modalCtrl: ModalController,
    private api: ApiService,
    private loader: LoaderService
  ) {}

  submit() {}

  dailyGradeList = [];

  ngOnInit() {
    console.log(this.params.data.studentId);

    this.studentId = this.params.data.studentId;
    this.loader.getSimpleLoader().then(async (res) => {
      res.present();
      await this.getStudentClassSummary(this.currentDateTime());
    });
  }

  async onChangeSummary(change) {
    let dateTime = new Date(change.detail.value).toISOString();
    await this.getStudentClassSummary(dateTime);
  }

  async getStudentClassSummary(dateTime) {
    this.api.getLearnersByStudentId(this.studentId, dateTime).subscribe(
      (res) => {
        this.dailyGradeList = [];
        console.log(res);

        let keys = Object.keys(res);

        for (let i = 0; i < keys.length; i++) {
          const e = res[i];
          this.dailyGradeList.push({
            classId: e.classId,
            className: e.className,
            dailyAttendance: e.dailyAttendance,
            dayStart: e.dayStart,
            grade: e.grade,
            learnerId: this.studentId,
          });
        }

        console.log(this.dailyGradeList);
      },
      (err) => {
        alert(err.message);
        this.loader.dismissLoader();
      },
      () => {
        this.loader.dismissLoader();
      }
    );
  }

  async submitRequest() {
    if (this.dailyGradeList.length == 0) {
      alert("You must add/update users inorder to save.");
      return;
    }

    let createLoader = await this.loader.getSimpleLoader();
    createLoader.present();

    this.api.addDailyGrades(this.dailyGradeList).subscribe(
      () => {
        alert("Successfully added/updated students!");
        this.dailyGradeList = [];
        this.ngOnInit();
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

  cancel(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  currentDateTime() {
    var date = new Date();
    return date.toISOString();
  }

  async termReport() {
    const modal = await this.modalCtrl.create({
      component: TermReportComponent,
      componentProps: {
        studentId: this.studentId,
      },
      swipeToClose: true,
    });
    await modal.present();
  }
}
import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { CreateStudentOptions } from "../../interfaces/user-options";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.component.html',
  styleUrls: ['./register-attendance.component.scss'],
})
export class RegisterAttendanceComponent implements OnInit {

  classId;

  createLeaner: CreateStudentOptions = {
    firstnames: "",
    surname: "",
    id: 0,
    attendance: false,
    isActive: true,
  };

  learnerList = [];

  constructor(
    public modalCtrl: ModalController,
    public api: ApiService,
    public loader: LoaderService,
    private navParams: NavParams
  ) {
    this.classId = this.navParams.data.classId;
  }

  ngOnInit() {
    this.loader.getSimpleLoader().then(async (res) => {
      res.present();
      await this.getLearners(this.classId);
    });
  }

  async getLearners(classId) {
    this.api.getClassStudents(classId).subscribe(
      (res) => {
        this.learnerList = [];

        let keys = Object.keys(res);

        for (let i = 0; i < keys.length; i++) {
          const e = res[i];
          this.learnerList.push({
            firstnames: e.firstnames,
            surname: e.surname,
            id: e.studentId,
            attendance: e.attendance,
            isActive: e.isActive,
          });
        }

        console.log(this.learnerList);
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
    let studentList = [];
    let payload = {
      students: [],
      classId: this.classId,
    };

    if (this.learnerList.length == 0) {
      alert("You must add/update users inorder to save.");
      return;
    }

    let createLoader = await this.loader.getSimpleLoader();
    createLoader.present();

    this.learnerList.forEach((e) => {
      studentList.push({
        firstnames: e.firstnames,
        surname: e.surname,
        studentId: parseInt(e.id),
        attendance: e.attendance,
        isActive: e.isActive,
      });
    });

    payload.students = studentList;

    console.log(payload);

    this.api.addLearnersItem(payload).subscribe(
      () => {
        alert("Successfully added/updated students!");
        this.learnerList = [];
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
}
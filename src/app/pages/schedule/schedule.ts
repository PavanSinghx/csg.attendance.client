import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  ModalController,
  ToastController,
  Config,
  NavController,
} from "@ionic/angular";

import { ScheduleClassPage } from "../schedule-class/schedule-class";
import { UserData } from "../../providers/user-data";
import { ApiService } from "../../providers/api.service";
import { LoaderService } from "../../providers/loader.service";
import { DailyReportComponent } from "../daily-report/daily-report.component";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html",
  styleUrls: ["./schedule.scss"],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild("scheduleList", { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = "";
  segment = "all";
  excludeTracks: any = [];
  shownSessions = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public api: ApiService,
    public loader: LoaderService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loader.getSimpleLoader().then(async (res) => {
      res.present();
      await this.updateSchedule();
    });

    this.ios = this.config.get("mode") === "ios";
  }

  async updateSchedule() {
    await this.api.getClassSummary().subscribe(
      (res) => {
        this.shownSessions = [];
        let keys = Object.keys(res);
        for (let i = 0; i < keys.length; i++) {
          const e = res[i];
          this.shownSessions.push({
            name: e.classDescription,
            classId: e.classId,
          });
        }
      },
      (err) => {
        alert(err.message);
      },
      () => {
        this.loader.dismissLoader();
      }
    );
  }

  removeClass(session) {
    if (!confirm("Are you sure you want to delete class: " + session.classId)) {
      return;
    }

    this.api.deleteClassItem(session.classId).subscribe(
      (_) => {
        alert("Successfully Deleted!");
        this.ngOnInit();
      },
      (err) => alert(err.message)
    );
  }

  async addClass() {
    await this.presentClassModal(ScheduleClassPage);
  }

  async manageStudents() {
    await this.presentClassModal(DailyReportComponent);
  }

  async presentClassModal(component) {
    const modal = await this.modalCtrl.create({
      component: component,
      swipeToClose: true,
    });
    await modal.present();

    modal.onWillDismiss().then(() => {
      this.updateSchedule();
    });
  }
}

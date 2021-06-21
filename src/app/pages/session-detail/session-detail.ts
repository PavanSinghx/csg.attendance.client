import { Component } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { LoaderService } from "../../providers/loader.service";
import { ModalController } from "@ionic/angular";
import { RegisterLearnerComponent } from "../register-learner/register-learner.component";
import { RegisterAttendanceComponent } from "../register-attendance/register-attendance.component";

@Component({
  selector: "page-session-detail",
  styleUrls: ["./session-detail.scss"],
  templateUrl: "session-detail.html",
})
export class SessionDetailPage {
  session: number;
  isFavorite = false;
  defaultHref = "";

  constructor(
    private userProvider: UserData,
    private route: ActivatedRoute,
    public loader: LoaderService,
    public modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.session = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ionViewDidEnter() {
    this.defaultHref = `/home/schedule`;
  }

  async registerStudents() {
    await this.presentClassModal(RegisterLearnerComponent);
  }

  async registerAttendance() {
    await this.presentClassModal(RegisterAttendanceComponent);
  }

  async presentClassModal(component) {
    console.log(this.session);
    const modal = await this.modalCtrl.create({
      component: component,
      componentProps: {
        classId: this.session,
      },
      swipeToClose: true,
    });
    await modal.present();
  }
}

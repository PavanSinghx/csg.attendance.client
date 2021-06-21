import { Component } from "@angular/core";
import { Config, ModalController, NavParams } from "@ionic/angular";
import { CreateClassOptions } from "../../interfaces/user-options";
import { ApiService } from "../../providers/api.service";

import { LoaderService } from "../../providers/loader.service";

@Component({
  selector: "page-schedule-class",
  templateUrl: "schedule-class.html",
  styleUrls: ["./schedule-class.scss"],
})
export class ScheduleClassPage {
  ios: boolean;
  createClass: CreateClassOptions = {
    classDescription: "",
    endTime: "",
    startTime: "",
  };

  tracks: { name: string; icon: string; isChecked: boolean }[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public api: ApiService,
    public loader: LoaderService
  ) {}

  async addClass() {
    if (!this.verifyClass()) {
      return;
    }

    let createLoader = await this.loader.getSimpleLoader();
    createLoader.present();

    this.api.addClassItem(this.createClass).subscribe(
      () => {
        alert("Successfully added class!");
        this.createClass = {
          classDescription: "",
          endTime: "",
          startTime: "",
        };
      },
      (err) => {
        alert(err.message);
      },
      () => {
        createLoader.dismiss();
      }
    );
  }

  verifyClass() {
    if (this.createClass.startTime == "") {
      alert("Please ensure that you add a valid start time!");
      return false;
    }

    if (this.createClass.endTime == "") {
      alert("Please ensure that you add a valid end time!");
      return false;
    }

    if (this.createClass.classDescription == "") {
      alert("Please ensure that you add a valid class description!");
      return false;
    }

    let startIndex = this.createClass.startTime.substring(
      0,
      this.createClass.startTime.indexOf(":")
    );
    let endIndex = this.createClass.endTime.substring(
      0,
      this.createClass.endTime.indexOf(":")
    );

    if (endIndex <= startIndex) {
      alert("Start time cannot be greater than or equal to end time!");
      return false;
    }

    return true;
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}

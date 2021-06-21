import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SessionDetailPage } from "./session-detail";
import { SessionDetailPageRoutingModule } from "./session-detail-routing.module";
import { IonicModule } from "@ionic/angular";
import { RegisterLearnerComponent } from "../register-learner/register-learner.component";
import { FormsModule } from "@angular/forms";
import { RegisterAttendanceComponent } from "../register-attendance/register-attendance.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionDetailPageRoutingModule,
  ],
  declarations: [
    SessionDetailPage,
    RegisterLearnerComponent,
    RegisterAttendanceComponent,
  ],
  entryComponents: [RegisterLearnerComponent, RegisterAttendanceComponent],
})
export class SessionDetailModule {}

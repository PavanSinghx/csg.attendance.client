import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule';
import { ScheduleClassPage } from '../schedule-class/schedule-class';
import { DailyReportComponent } from '../daily-report/daily-report.component';

import { SchedulePageRoutingModule } from './schedule-routing.module';
import { DailyReportStudentComponent } from '../daily-report-student/daily-report-student.component';
import { TermReportComponent } from '../term-report/term-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule
  ],
  declarations: [
    SchedulePage,
    ScheduleClassPage,
    DailyReportComponent,
    DailyReportStudentComponent,
    TermReportComponent
  ],
  entryComponents: [
    ScheduleClassPage,
    DailyReportComponent,
    DailyReportStudentComponent,
    TermReportComponent
  ]
})
export class ScheduleModule { }

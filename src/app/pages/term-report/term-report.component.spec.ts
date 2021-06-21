import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermReportComponent } from './term-report.component';

describe('TermReportComponent', () => {
  let component: TermReportComponent;
  let fixture: ComponentFixture<TermReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

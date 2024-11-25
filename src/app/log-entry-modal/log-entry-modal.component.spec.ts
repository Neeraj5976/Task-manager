import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntryModalComponent } from './log-entry-modal.component';

describe('LogEntryModalComponent', () => {
  let component: LogEntryModalComponent;
  let fixture: ComponentFixture<LogEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEntryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

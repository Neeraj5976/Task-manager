import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const bootstrap: any; // Declare Bootstrap globally

@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.component.html',
  styleUrls: ['./timer-modal.component.scss'],
})
export class TimerModalComponent implements OnInit {
  timerForm!: FormGroup;
  timer: any;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.timerForm = this.fb.group({
      task: ['', Validators.required],
      notes: [''],
    });
  }

  startTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    alert(`Time logged: ${this.hours}h : ${this.minutes}m : ${this.seconds}s`);
    this.resetTimer();
  }

  resetTimer(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  closeModal(): void {
    const modalElement = document.getElementById('timerModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }

  onCancel(): void {
    this.resetTimer();
    this.closeModal();
  }

  onSubmit(): void {
    if (this.timerForm.valid) {
      this.stopTimer();
      this.closeModal();
    }
  }
}

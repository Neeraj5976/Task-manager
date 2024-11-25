import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-entry-modal',
  templateUrl: './log-entry-modal.component.html',
  styleUrls: ['./log-entry-modal.component.scss'],
})
export class LogEntryModalComponent implements OnInit {
  logForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      date: ['', Validators.required],
      task: ['', Validators.required],
      timeSpent: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
      notes: [''],
    });
  }

  onSubmit(): void {
    if (this.logForm.valid) {
      console.log(this.logForm.value);
      alert('Log entry saved!');
      this.closeModal();
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('logEntryModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement); // Initialize Bootstrap Modal
      modal?.hide();
    }
  }
}

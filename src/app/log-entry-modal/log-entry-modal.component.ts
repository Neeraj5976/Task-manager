import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-log-entry-modal',
  templateUrl: './log-entry-modal.component.html',
  styleUrls: ['./log-entry-modal.component.scss'],
})
export class LogEntryModalComponent implements OnInit {
  logForm!: FormGroup;
  task_ids: number[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.logForm = this.fb.group({
      date: ['', Validators.required],
      task: ['', Validators.required],
      timeSpent: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
      notes: [''],
    });
    this.loadTasks();

  }

  loadTasks(): void {
    this.taskService.getTasksObservable().subscribe((tasks) => {
      this.task_ids = tasks.map(task => task.id);
      
    });
  }


  onSubmit(): void {
    if (this.logForm.valid) {
      console.log(this.logForm.value);

      // Push the log entry to the task service logs array
      this.taskService.logs.push(this.logForm.value);

      // Close the modal
      // this.closeModal();
    }
  }

  // closeModal(): void {
  //   const modalElement = document.getElementById('logEntryModal');
  //   if (modalElement) {
  //     // Use Bootstrap's modal instance to hide the modal
  //     const modalInstance = new (window as any).bootstrap.Modal(modalElement);
  //     modalInstance.hide(); // Properly hide the modal
  //   }
  // }
}

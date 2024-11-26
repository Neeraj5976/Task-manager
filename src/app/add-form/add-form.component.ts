import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service'; // Service for managing tasks

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    // Initialize the form
    this.taskForm = this.fb.group({
      taskNumber: [{ value: this.taskService.generateTaskNumber(), disabled: true }],
      title: ['', [Validators.required]],
      dueDate: [''],
      assignTo: ['Unassigned'],
      priority: ['Very Low'],
      description: ['', [Validators.maxLength(10000)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Save task logic
      const newTask = this.taskForm.getRawValue(); // Include disabled fields
      this.taskService.addTask(newTask); // Add task to the service
      console.log('Task Added:', newTask);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.taskForm.reset({
      taskNumber: this.taskService.generateTaskNumber(),
      title: '',
      dueDate: '',
      assignTo: 'Unassigned',
      priority: 'Very Low',
      description: '',
    });
  }
}

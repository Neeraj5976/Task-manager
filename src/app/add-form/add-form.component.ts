import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskNumber: [{ value: 'TASK-9', disabled: true }],
      title: ['', [Validators.required]],
      dueDate: [''],
      assignTo: ['Unassigned'],
      priority: ['Very Low'],
      description: ['', [Validators.maxLength(10000)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.getRawValue());
    }
  }
}

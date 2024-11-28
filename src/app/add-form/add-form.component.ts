import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  taskForm!: FormGroup;
  mode: 'add' | 'edit' | 'clone' = 'add';
  taskData: Task | null = null;
  tasks_assinies: string[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private taskModalService: TaskService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTasks();
    // Subscribe to the mode and task data
    this.taskModalService.getMode().subscribe((mode) => {
      this.mode = mode;
    });

    this.taskModalService.getTaskData().subscribe((taskData) => {
      this.taskData = taskData;
      if(taskData) {
        this.populateForm();
      }
      else {
        this.initializeForm();
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasksObservable().subscribe((tasks) => {
      this.tasks_assinies = tasks.map(task => task.assignedTo);
      
    });
  }


  initializeForm(): void {
    this.taskForm = this.fb.group({
      id: [{ value: this.taskService.generateTaskNumber(), disabled: true }],
      title: ['', [Validators.required]],
      dueDate: [''],
      assignedTo: ['Unassigned'],
      priority: ['Low'],
      description: ['', [Validators.maxLength(10000)]],
      status:['Yet To Start'],
      completion:0
    });
  }

  populateForm(): void {
    if (this.taskData) {
      const taskNumber = this.mode === 'clone' ? this.taskService.generateTaskNumber() : this.taskData.id;
      this.taskForm.patchValue({
        id:taskNumber,
        title: this.taskData.title,
        dueDate: this.taskData.dueDate,
        assignedTo:this.taskData.assignedTo ||  'Unassigned',
        priority: this.taskData.priority,
        description: this.taskData.description,
        status:this.taskData.status,
        completion:this.taskData.completion
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.getRawValue();

      if (this.mode === 'add') {
        this.taskService.addTask(taskData);
        console.log('Task Added:', taskData);
      } else if (this.mode === 'edit') {
        const updatedTask = { ...this.taskData, ...taskData };
        this.taskService.updateTask(updatedTask);
        this.taskService.selectedTask = taskData;
      
        console.log('Task Updated:', updatedTask);
      } else if (this.mode === 'clone') {
        this.taskService.addTask(taskData);
        console.log('Task Cloned:', taskData);
      }

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

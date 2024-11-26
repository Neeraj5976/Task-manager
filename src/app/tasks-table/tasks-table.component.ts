import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent {
  tasks: Task[] = [];
  filter = { status: '', priority: '' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksObservable().subscribe((tasks) => {
       this.tasks = tasks;
    }); 
  }

  onFilterChange(): void {
    this.loadTasks();
  }
}

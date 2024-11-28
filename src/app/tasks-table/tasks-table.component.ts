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
  filteredTasks: Task[] = []; // Filtered tasks

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksObservable().subscribe((tasks) => {
       this.tasks = tasks;
       this.applyFilters(); // Apply filters on initialization
    }); 
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const statusMatch = !this.filter.status || task.status === this.filter.status;
      const priorityMatch = !this.filter.priority || task.priority === this.filter.priority;
      return statusMatch && priorityMatch;
    });
  }
  
  openDetailView(task:any){
    this.taskService.selectedTask = task;
  }

}

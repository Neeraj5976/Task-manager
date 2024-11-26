import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksObservable().subscribe((tasks) => {
      this.tasks = tasks;
      if (tasks.length > 0) {
        this.selectTask(tasks[0]); // Select the first task by default
      }
    });
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  logTime(): void {
    // alert('Log Time functionality is under development.');
  }

  changeStatus(status: string): void {
    if (this.selectedTask) {
      this.selectedTask.status = status;
      this.taskService.updateTask(this.selectedTask).subscribe(() => {
        // alert(`Task status changed to ${status}`);
      });
    }
  }

  editTask(): void {
    // alert('Edit Task functionality is under development.');
  }

  cloneTask(): void {
    if (this.selectedTask) {
      const clonedTask:Task = { ...this.selectedTask, id: 1 };
      this.taskService.addTask(clonedTask);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Timesheet } from '../models/timesheet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
  tasks: Task[] = [];
  // selectedTask: Task | null = null;
  logs: Timesheet[] = [];
  private taskSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute,public taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskSubscription = this.taskService.getTasksObservable().subscribe((tasks) => {
      this.tasks = tasks;
      if (tasks.length > 0 && this.taskService.selectedTask == null) {
         this.taskService.selectedTask = tasks[0];
      }
    });
  }

 

  selectTask(task: Task): void {
    this.taskService.selectedTask = task;
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  logTime(): void {

    // alert('Log Time functionality is under development.');
  }

  changeStatus(status: string): void {
    if (this.taskService.selectedTask) {
      this.taskService.selectedTask.status = status;
      if(status == 'Completed'){
        this.taskService.selectedTask.completion = 100;
      }
      else if(status == 'In Progress'){
        this.taskService.selectedTask.completion = 20;
      }
      this.taskService.updateTask(this.taskService.selectedTask).subscribe(() => {
        // alert(`Task status changed to ${status}`);
      });
    }
  }

  editTask(): void {
    // alert('Edit Task functionality is under development.');
  }

  cloneTask(): void {
    if (this.taskService.selectedTask) {
      const clonedTask:Task = { ...this.taskService.selectedTask, id: 1 };
      this.taskService.addTask(clonedTask);
    }
  }

  openTaskModal(mode: 'add' | 'edit' | 'clone'): void {
    this.taskService.setMode(mode);
    
    this.taskService.setTaskData(mode === 'add' ? null : this.taskService.selectedTask);
    console.log(this.taskService.selectedTask)
    const modal =new (window as any).bootstrap.Modal(document.getElementById('taskModal')!);
    modal.show();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from the observable to avoid memory leaks
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
  
}

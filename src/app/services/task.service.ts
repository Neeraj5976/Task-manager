import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      priority: 'High',
      status: 'Pending',
      dueDate: new Date('2024-01-07'),
      completion: 50,
      assignedTo: 'John',
    },
    {
      id: 2,
      title: 'Task 2',
      priority: 'Low',
      status: 'Yet To Start',
      dueDate: new Date('2024-01-10'),
      completion: 0,
      assignedTo: 'Alice',
    },
    {
      id: 3,
      title: 'Task 3',
      priority: 'High',
      status: 'Completed',
      dueDate: new Date('2023-12-20'),
      completion: 100,
      assignedTo: 'Mike',
    },
    {
      id: 4,
      title: 'Task 4',
      priority: 'High',
      status: 'In Progress',
      dueDate: new Date('2024-02-01'),
      completion: 75,
      assignedTo: 'Sarah',
    },
  ];

  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
  private taskCounter = this.tasks.length + 1;

  generateTaskNumber(): string {
    return `TASK-${this.taskCounter++}`;
  }

  getTasksObservable(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.taskCounter;
    this.tasks.push(task);
    this.taskSubject.next([...this.tasks]);
  }

  updateTask(updatedTask: Task): Observable<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
      this.taskSubject.next([...this.tasks]);
    }
    return new BehaviorSubject<void>(undefined).asObservable(); // Simulate an observable response
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.taskSubject.next([...this.tasks]);
  }

  cloneTask(taskId: number): void {
    const taskToClone = this.tasks.find((task) => task.id === taskId);
    if (taskToClone) {
      const clonedTask: Task = {
        ...taskToClone,
        id: this.taskCounter++,
        title: `${taskToClone.title} (Cloned)`,
      };
      this.tasks.push(clonedTask);
      this.taskSubject.next([...this.tasks]);
    }
  }

  getTasks(filter?: { status?: string; priority?: string }): Task[] {
    if (!filter) {
      return this.tasks;
    }
    return this.tasks.filter(
      (task) =>
        (!filter.status || task.status === filter.status) &&
        (!filter.priority || task.priority === filter.priority)
    );
  }

  getFilteredTasksObservable(filter?: { status?: string; priority?: string }): Observable<Task[]> {
    const filteredTasks = this.getTasks(filter);
    return new BehaviorSubject<Task[]>(filteredTasks).asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Timesheet } from '../models/timesheet';

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
  private taskCounter = this.tasks.length;
  private taskDataSubject = new BehaviorSubject<Task | null>(null);
  private modeSubject = new BehaviorSubject<'add' | 'edit' | 'clone'>('add');
  public selectedTask:Task | null = null;
  public logs: Timesheet[] = []; // Map taskNumber to logs
  private TASK_STORAGE_KEY = 'TASK_LIST'
  private LOG_STORAGE_KEY = 'LOGS_LIST'
  private statisticsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.calculateStatistics());
  public logsSubject: BehaviorSubject<Timesheet[]> = new BehaviorSubject<Timesheet[]>(this.logs);
  constructor() {

    this.taskSubject.subscribe(() => {
      this.statisticsSubject.next(this.calculateStatistics());
    });
    this.loadFromLocalStorage();
    this.getTasksObservable().subscribe((tasks) => {
       localStorage.setItem(this.TASK_STORAGE_KEY, JSON.stringify(this.tasks));
    });
    this.getLogsObservable().subscribe(logs => {
      localStorage.setItem(this.LOG_STORAGE_KEY, JSON.stringify(this.logs));
    })
    
  }

  getLogsObservable(): Observable<any> {
    return this.logsSubject.asObservable();
  }

  // private saveToLocalStorage(): void {
  //   localStorage.setItem(this.TASK_STORAGE_KEY, JSON.stringify(this.tasks));
  //   localStorage.setItem(this.LOG_STORAGE_KEY, JSON.stringify(this.logs));
  // }

  private loadFromLocalStorage(): void {
    const tasksFromStorage = localStorage.getItem(this.TASK_STORAGE_KEY);
    const logsFromStorage = localStorage.getItem(this.LOG_STORAGE_KEY);
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
      this.taskCounter = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 0;
      this.taskSubject.next([...this.tasks]);
    }
    if (logsFromStorage) {
      this.logs = JSON.parse(logsFromStorage);
    }
  }


  // Real-time statistics observable
  getStatisticsObservable(): Observable<any> {
    return this.statisticsSubject.asObservable();
  }

  private calculateStatistics(): any {
    const today = new Date();
    const overdueTasks = this.tasks.filter(
      (task) => new Date(task.dueDate) < today && task.status !== 'Completed'
    ).length;
    const dueToday = this.tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return (
        dueDate.getFullYear() === today.getFullYear() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getDate() === today.getDate() &&
        task.status !== 'Completed'
      );
    }).length;
    const priorityToday = this.tasks.filter(
      (task) =>
        task.priority === 'High' &&
        new Date(task.dueDate).toDateString() === today.toDateString()
    ).length;
    const yetToStart = this.tasks.filter((task) => task.status === 'Yet To Start').length;
    const inProgress = this.tasks.filter((task) => task.status === 'In Progress').length;
    const unassigned = this.tasks.filter((task) => task.assignedTo === 'Unassigned').length;

    return {
      overdueTasks,
      dueToday,
      priorityToday,
      yetToStart,
      inProgress,
      unassigned,
    };
  }





  generateTaskNumber(): number {
    const ids = this.tasks.map(task => task.id); // Extract all existing IDs
    let newId = 1; // Start from 1
    while (ids.includes(newId)) {
      newId++; // Find the smallest unused ID
    }
    console.log("newId ",newId)
    return newId;

  }
  

  getTasksObservable(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.taskSubject.next([...this.tasks]);
    this.taskCounter = this.tasks.length;
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
    this.taskCounter = this.tasks.length;

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


  setTaskData(task: Task | null): void {
    this.taskDataSubject.next(task);
  }

  getTaskData() {
    return this.taskDataSubject.asObservable();
  }

  setMode(mode: 'add' | 'edit' | 'clone'): void {
    this.modeSubject.next(mode);
  }

  getMode() {
    return this.modeSubject.asObservable();
  }


 
}

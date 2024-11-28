import { Component, ViewChild } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { TaskService } from '../services/task.service';
// import { PopupModalComponent } from './popup-modal/popup-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild('popup') popup!: PopupModalComponent;
  statistics: any = {};

  constructor(public taskService: TaskService) {
    this.taskService.getStatisticsObservable().subscribe((stats) => {
      this.statistics = stats;
    });
  }

  openTaskModal(mode: 'add' | 'edit' | 'clone'): void {
    this.taskService.setMode(mode);
    this.taskService.setTaskData(mode === 'add' ? null : this.taskService.selectedTask);
    console.log(this.taskService.selectedTask)
    const modal =new (window as any).bootstrap.Modal(document.getElementById('taskModal')!);
    modal.show();
  }
}

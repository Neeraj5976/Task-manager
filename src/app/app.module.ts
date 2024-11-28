import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { LogEntryModalComponent } from './log-entry-modal/log-entry-modal.component';
import { TimerModalComponent } from './timer-modal/timer-modal.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksTableComponent,
    AddFormComponent,
    PopupModalComponent,
    LogEntryModalComponent,
    TimerModalComponent,
    DetailViewComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Required for form handling
    FormsModule, // Required for ngModel binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

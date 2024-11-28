import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Home page
  { path: 'details/:id', component: DetailViewComponent }, // Details page with dynamic ID
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for invalid URLs
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

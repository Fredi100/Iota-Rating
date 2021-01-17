import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BoothManagerComponent } from './booth-manager/booth-manager.component';
import { BoothInfoComponent } from './booth-info/booth-info.component';
import { VisitorSetupComponent } from './visitor-setup/visitor-setup.component';

const routes: Routes = [
  { path: 'booth-manager', component: BoothManagerComponent },
  { path: 'booth-info', component: BoothInfoComponent },
  { path: 'visitor-setup', component: VisitorSetupComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'view/:id', component: EmployeeViewComponent },
  { path: 'delete/:id', component: EmployeeDeleteComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

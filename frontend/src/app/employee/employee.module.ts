import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeViewComponent,
    EmployeeDeleteComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxSpinnerModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeModule { 
}

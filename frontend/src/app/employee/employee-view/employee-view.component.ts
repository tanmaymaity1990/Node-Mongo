import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employee:any = '';
  created:any = '';

  constructor(
    public employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.viewEmployee(id);
  }

  viewEmployee(id:any){
    this.spinner.show();
    return this.employeeService.get(id).subscribe((result:any = {}) => {
      this.employee = result.result;
      this.created = moment(this.employee.created).format('D/M/YYYY');
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      if(error.status == 401){
        Swal.fire(error.error.message, '', 'error');
        this.router.navigate(['/login']);
      }
      else {
        Swal.fire(error.error.message, '', 'error');
        this.router.navigate(['/employee']);
      }
    })
  }
}

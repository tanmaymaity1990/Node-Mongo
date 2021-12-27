import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  id:any = '';
  employees:any = '';
  employeeObj:any = '';
  isValid: boolean = true;
  errors:any = {
    empId: '',
    name: '',
    age: '',
    email: '',
    phone: '',
    salary: '',
    address: ''
  }

  constructor(
    public employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(this.id);
  }

  getEmployee(id:any){
    this.spinner.show();
    return this.employeeService.get(id).subscribe((result:any = {}) => {
      this.employees = result.result;
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      Swal.fire(error.error.message, '', 'error');
      this.router.navigate(['/employee']);
    })
  }

  validate(e:any, name:string){
    switch(name){
      case "empId":
        if(e.trim() == ''){
          this.errors.empId = 'Employee ID can not be blank.';
        }
        else{
          this.errors.empId = '';
        }
        break;
      case "name":
        if(e.trim() == ''){
          this.errors.name = 'Name can not be blank.';
        }
        else{
          this.errors.name = '';
        }
        break;
      case "age":
        if (/[^0-9 ]/.test(e)) {
          this.errors.age = 'Age should be numeric.';
        } 
        else if(e.trim() == ''){
          this.errors.age = 'Age can not be blank.';
        }
        else{
          this.errors.age = '';
        }
        break;  
      case "email":
        var regEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
        if (!regEmail.test(e)) {
          this.errors.email = 'Email is not valid.';
        }
        else if(e.trim() == ''){
          this.errors.email = 'Email can not be blank.';
        }
        else{
          this.errors.email = '';
        }
        break;    
      case "phone":
        if(e.trim() == ''){
          this.errors.phone = 'Phone can not be blank.';
        }
        else{
          this.errors.phone = '';
        }
        break; 
      case "salary":
        if (/[^0-9 ]/.test(e)) {
          this.errors.salary = 'Salary should be numeric.';
        } 
        else if(e.trim() == ''){
          this.errors.salary = 'Salary can not be blank.';
        }
        else{
          this.errors.salary = '';
        }
        break; 
      case "address":
        if(e.trim() == ''){
          this.errors.address = 'Address can not be blank.';
        }
        else{
          this.errors.address = '';
        }
        break;     
      default:
        break;
    }

    if(this.errors.empId.length === 0 && 
      this.errors.name.length === 0 && 
      this.errors.age.length === 0 && 
      this.errors.email.length === 0 && 
      this.errors.phone.length === 0 && 
      this.errors.salary.length === 0 && 
      this.errors.address.length === 0
      ){
        this.isValid = true;
      }
    else{
      this.isValid = false;
    }
  }

  editEmployee(data:any){
    this.spinner.show();
    this.employeeObj = {
      empId: data.empId,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      address: data.address,
      modified: Date.now()
    }
    return this.employeeService.update(this.id, this.employeeObj).subscribe((result:any = {}) => {
      this.spinner.hide();
      Swal.fire(result.message, '', 'success');
      this.router.navigate(['/employee']);
    },
    error => {
      this.spinner.hide();
      if(error.status == 401){
        Swal.fire(error.error.message, '', 'error');
        this.router.navigate(['/login']);
      }
      else {
        Swal.fire(error.error.message, '', 'error');
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})

export class EmployeeAddComponent implements OnInit {

  isValid: boolean = false;
  errors:any = {
    empId: 'This field is required',
    name: 'This field is required',
    age: 'This field is required',
    email: 'This field is required',
    phone: 'This field is required',
    salary: 'This field is required',
    address: 'This field is required'
  }
  employeeObj: Employee = new Employee();

  constructor( 
    public employeeService: EmployeeService, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
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

  addEmployee(data:any){
    this.spinner.show();
    this.employeeObj = {
      empId: data.empId,
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      address: data.address,
      created: Date.now()
    }
    return this.employeeService.create(this.employeeObj).subscribe((result:any = {}) => {
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

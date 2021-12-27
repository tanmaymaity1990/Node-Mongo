import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isValid: boolean = false;
  errors:any = {
    fname: 'This field is required',
    lname: 'This field is required',
    email: 'This field is required',
    password: 'This field is required',
    confPassword: 'This field is required'
  }

 userObj: User = new User();

  constructor( 
    public userService: UserService, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/employee']);
    }
  }

  validate(e:any, name:string, password:string){
    switch(name){
      case "fname":
        if(e.trim() == ''){
          this.errors.fname = 'First Name can not be blank.';
        }
        else if (/[^a-z A-Z ]/.test(e)) {
          this.errors.fname = "First Name should be alphabetic.";
        }
        else{
          this.errors.fname = '';
        }
        break;
      case "lname":
        if(e.trim() == ''){
          this.errors.lname = 'Last Name can not be blank.';
        }
        else if (/[^a-z A-Z ]/.test(e)) {
          this.errors.lname = "Last Name should be alphabetic.";
        }
        else{
          this.errors.lname = '';
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
      case "password":
        if(e.trim() == ''){
          this.errors.password = 'Password can not be blank.';
        }
        else if(e.length < 8){
          this.errors.password = 'Password must be 8 characters long.';
        }
        else{
          this.errors.password = '';
        }
        break; 
      case "confPassword":
        if(e.trim() == ''){
          this.errors.confPassword = 'Confirm Password can not be blank.';
        }
        else if (password !== e) {
          this.errors.confPassword = 'Password and Confirm Password must be same.';
        } 
        else{
          this.errors.confPassword = '';
        }
        break;     
      default:
        break;
    }

    if(this.errors.fname.length === 0 && 
      this.errors.lname.length === 0 && 
      this.errors.email.length === 0 && 
      this.errors.password.length === 0 && 
      this.errors.confPassword.length === 0
      ){
        this.isValid = true;
      }
    else{
      this.isValid = false;
    }
  }

  register(data:any){
    this.spinner.show();
    this.userObj = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.confPassword,
    }
    return this.userService.create(this.userObj).subscribe((result:any = {}) => {
      this.spinner.hide();
      Swal.fire(result.message, '', 'success');
      this.router.navigate(['/login']);
    },
    error => {
      this.spinner.hide();
      Swal.fire(error.error.message, '', 'error');
    })
  }

}

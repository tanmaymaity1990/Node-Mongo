import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isValid: boolean = false;
  errors:any = {
    email: 'This field is required',
    password: 'This field is required'
  }

 userObj: any = '';

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

  validate(e:any, name:string){
    switch(name){
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
        else{
          this.errors.password = '';
        }
        break;   
      default:
        break;
    }

    if(this.errors.email.length === 0 && 
      this.errors.password.length === 0
      ){
        this.isValid = true;
      }
    else{
      this.isValid = false;
    }
  }

  login(data:any){
    this.spinner.show();
    this.userObj = {
      email: data.email,
      password: data.password,
    }
    return this.userService.login(this.userObj).subscribe((result:any = {}) => {
      localStorage.setItem('token', 'Bearer '+result.token);
      if(localStorage.getItem('token') != ''){
        this.spinner.hide();
        Swal.fire(result.message, '', 'success');
        this.router.navigate(['/employee']);
      }
    },
    error => {
      this.spinner.hide();
      Swal.fire(error.error.message, '', 'error');
    })
  }


}

import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
    Swal.fire("Successfully logout", '', 'success');
    this.router.navigate(['/login']);
  }

}

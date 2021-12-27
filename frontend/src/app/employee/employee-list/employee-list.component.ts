import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {Renderer2} from '@angular/core';
import { Employee } from '../../models/employee.model';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  employees: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor( 
    private renderer: Renderer2, 
    public employeeService: EmployeeService, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    new Promise(resolve => {
      this.loadScript('assets/vendor/datatables/jquery.dataTables.min.js').onload = () => {
        this.loadScript('assets/vendor/datatables/dataTables.bootstrap4.min.js').onload = () => {
          this.loadScript('assets/js/demo/datatables-demo.js').onload = () => {
          }
        }
      }
    });
    this.getAllEmployee();
  }


  public loadScript(src: string): HTMLScriptElement {
    const node = document.createElement('script');
    node.src = src; 
    node.type = 'text/javascript';
    node.async = true;
    this.renderer.appendChild(document.body, node);
    return node;
  }

  getAllEmployee(){
    this.spinner.show();
    return this.employeeService.getAll().subscribe((result:any = {}) => {
      this.employees = result.result;
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
        this.errorMessage = error.error.message;
      }
    })
  }

}

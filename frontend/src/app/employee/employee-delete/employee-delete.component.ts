import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';
import { ActivatedRoute , Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.deleteThis(id);
  }

  deleteThis(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: 'No, cancel it!'
    }).then((result) => {
      if (result.value) {
        this.deleteEmployee(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/employee']);
        Swal.fire(
          'Cancelled',
          'Your record is safe',
          'error'
        )
        
      }
    })
  }

  deleteEmployee(id:string){
    this.spinner.show();
    return this.employeeService.delete(id).subscribe((result:any = {}) => {
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
        this.router.navigate(['/employee']);
      }
    })
  }

}

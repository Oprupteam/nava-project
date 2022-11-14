import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { SortEvent } from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import { Employee } from '../../employee/employee';
import { RequestVacation } from '../request-vacation';
import { RequestVacationService } from '../request-vacation.service';

@Component({
  selector: 'app-request-vacation',
  templateUrl: './request-vacation.component.html',
  styleUrls: ['./request-vacation.component.scss']
})
export class RequestVacationComponent implements OnInit {
  displayedColumns: string[] = ['number','employee name','Etart Date','End Date', 'action'];
  requestVacations!: MatTableDataSource<RequestVacation>;
  employees!: Employee[];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  employeeService: any;


  total$: any;
  headers: any;
  toaster: any;



  constructor(private requestVacationService:RequestVacationService, private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang')  || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
   }



  ngOnInit(): void {
    this.getAllRequestVacation()
  }
public getAllRequestVacation(){
  this.requestVacationService.getAllRequestVacations().subscribe((data:RequestVacation[]) =>{
    this.requestVacations = new MatTableDataSource(data);
    this.requestVacations.paginator =this.paginator;
    this.requestVacations.sort = this.matSort;},
    (error)  =>
        {
          console.log(error);
          Swal.fire('Error !', 'Error in loading data !', 'error');

        }
      );

}
filterData($event: any){
  this.employees.filter = $event.target.value;
}

public updateRequestVacationById(vacationId: number): void {
  this.router.navigate(['/request-vacation/update-request-vacation', vacationId])
}
// public approverequest(_requestvacation:RequestVacation ):void{
//   this.requestVacations.Approvalrequest(this.requestvacation).subscribe( data => {
//     console.log(data);
//     Swal.fire(this.translate.instant('Success'), this.translate.instant('vacationisapproved'), 'success')


// },

}



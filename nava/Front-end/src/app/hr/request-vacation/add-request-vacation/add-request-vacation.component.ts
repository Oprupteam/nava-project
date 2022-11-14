import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Vacation } from '../../vacation/vacation';
import { VacationService } from '../../vacation/vacation.service';
import { RequestVacation } from '../request-vacation';
import { RequestVacationService } from '../request-vacation.service';

@Component({
  selector: 'app-add-request-vacation',
  templateUrl: './add-request-vacation.component.html',
  styleUrls: ['./add-request-vacation.component.scss']
})
export class AddRequestVacationComponent implements OnInit {
  employeeTypeService: any;
  vacationTypes: any ;
  vacationService: VacationService | undefined;
 vacation: any;



  constructor(private translate:TranslateService,
    private  requestVacationService: RequestVacationService,
    private router: Router,) { }
  ar=false
  en=false
    getlanguage(){

     if(localStorage.getItem('lang')=='ar')
     {
      this.ar=true
      this.en=false


     }
     if(localStorage.getItem('lang')=='en')
     {
      this.ar=false
      this.en=true

     }



    }
    requestVacationData={
      requestVacationId:'',
      vacationType:'',
      description:'',
      approvedBy:'',
      attachment:'',
      approve:1,
      vacation:
      { vacationTypeId:''},
      sartDate:"2022-10-10",
      endDate:"2022-10-10",
      Employee:{
      employeeId:''
      }

    }

  ngOnInit(): void {
    this.getAllVacationTypes(),
    this.addRequestvacation()
  }
  public getAllVacationTypes():void{

    this.vacationService?.getAllVacations().subscribe(
    (response:Vacation[])=>{
     this.vacationTypes=response;
     console.log(response);
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
    )
  }

  public addRequestvacation():void{
    this.requestVacationService.addRequestVacation(this.requestVacationData).subscribe(
      (response:RequestVacation[]) => this.router.navigate(['/request-vacation/view'])
    ),
    (error: HttpErrorResponse) => {

    }
}
}

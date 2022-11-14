import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee/employee.service';
import { TimeSheet } from '../time-sheet';
import { TimeSheetService } from '../time-sheet.service';
import { DecimalPipe } from '@angular/common';
import { CountryService } from 'src/app/components/tables/counteries.service';
import * as XLSX from 'xlsx';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SectionService } from '../../section/section.service';

@Component({
  selector: 'app-generate-sheet',
  templateUrl: './generate-sheet.component.html',
  styleUrls: ['./generate-sheet.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class GenerateSheetComponent implements OnInit {
  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  paginator: any;
  matSort: any;
  healthId: any;
  ExportTOExcel() {
    this.viewFlag=false
    this.toggleDivs()
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.TABLE.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Sheet.xlsx');
  }
  retriveCount: number = 0;
  employees:any;
  employeeInfo:any;
  section:any;
  empSalaryObject:any;

  timeSheetData = {
    timeSheetId: '',
    attDay: '',
     attWeekDay: '',
     attMonth: '',
     attYear: '',
     overTimeHour: '',
     overTimeValue: '',
     attValue: '',
     attHour: '',
     saveFlag:'',
     attTotalValue:'',

    employee: {
      employeeId: '',

    },
  };
  timeSheets:any;

  constructor(private timeSheetService: TimeSheetService,
              private employeeService: EmployeeService,
              private router: Router,
              private translate: TranslateService,
              private sectionService:SectionService

   // private contractdService:ContractDetailService,

     ) {
     // Language code
     this.translate.setDefaultLang('ar');
     const lang = localStorage.getItem('lang')  || 'ar';
     this.translate.use(lang);
     document.documentElement.lang = lang;
  }

  ngOnInit(): void {

    //View Employee in DropDownList--
     this.getEmployee();

    this.monthNumber=new Date().getMonth()
    this.yearNumber=new Date().getFullYear()
  }


    saveToggle=true;



  //Get Employee Function // Calling Service
  public getEmployee(): void {
    this.employeeService.getAllEmployees().subscribe((response: Employee[]) => {

      this.employees = response;
      


    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getEmployeeById() {
    this.employeeService.getEmployeeById(this.employees.employeeId).subscribe((response: Employee[]) => {
      this.employeeInfo = response;
      console.log(response)
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    ) 
  }

  // getSalaryObjectByContractId=()=>{
  //   this.employeeService.getSalaryObjectByContractId(this.contractSalaryObjectData.contract.contractId).subscribe(data=>{
  //    this.empSalaryObject=data   
  //    this.calcSalary()
  //   })
  //  }
  //  sum = 0
  //  m = 0
  //  s = 0
  //  calcSalary(){
  //   this.sum = 0
  //   this.m = 0
  //   this.s = 0
  //   for (let sal of this.empSalaryObject) {
  //     if(sal.type === '-1')
  //       this.s = this.s + sal.amount
  //     if(sal.type === '1')
  //       this.m = this.m + sal.amount
  //     }
  //     this.sum = this.m - this.s
  // }

  getSectionByEmpId(){
    this.sectionService.getSectionByEmpId(this.employees.employeeId).subscribe(
      data =>{ 
        if(data.length >= 0){
        let len = data.length - 1
        this.section = data[len]  }
        else
          this.section = data
     console.log(this.section)
    })
   }


  // Update Function/ Calling Service
  public onUpdateTimeSheet(timeSheet:any): void {
    timeSheet.saveFlag=1;
    this.saveToggle=false

    this.timeSheetService.updateTimeSheet(timeSheet).subscribe(

      (data) => {


        Swal.fire(this.translate.instant('success'), this.translate.instant('SheetisUpdated'), 'success')

this.getEmpSheetT(timeSheet.employee.employeeId,this.monthNumber,this.yearNumber)
      },
      (error) => {

        Swal.fire(this.translate.instant('error')!!, this.translate.instant('ErrorWhileUpdatingSheet'), 'error')
   ///////////////////////

        console.log(error);
      }
    );
  }

 //////////////

  getValue(event:Event){
    var attCount= (event.target as HTMLInputElement).value;
    let daysInMonth =this.getLastDay(this.monthNumber,this.yearNumber);
let attValue=(parseFloat(attCount)*(this.salary/(daysInMonth*8))).toFixed(2)

    this.finalTotalAttValue += parseFloat( attValue)
    this.finalTotalAtt +=parseInt(attCount)

    return  (parseFloat(attCount)*(this.salary/(daysInMonth*8))).toFixed(2);
  }




   monthNumber=0
   yearNumber=0
  attTotal=0;



finalTotalOver=0;
 finalTotalAttValue=0;
finalTotalOverValue=0;


finalTotalOfTotals=0;


  public getLastDay(month: number, year: number) {

//alert(month)

if(month==1 || month==3 || month==5 || month==7|| month==8 || month==10 || month==12){ return 31; }
  //  else if ([1, 3, 5, 7, 8, 10, 12].includes(month,0)==true) { alert(month); return 31; }
    // else if ([4, 6, 9, 11].includes(month,0)==true) { return 30 }
    else if(month==4 || month==6 || month==9 || month==11){  return 30; }
    else  {
      if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)){return 28}
      else {return 29}
    }

  }

  public onGenerateSheet(employeeId: number): void {
    this.timeSheets=null
   // this.getEmpSheetT(this.employees.employeeId,this.monthNumber,this.yearNumber)
    this.timeSheetService.getSheetofEmployeeS(this.employees.employeeId,1,this.monthNumber,this.yearNumber).subscribe((response: TimeSheet[]) => {




   if (response.length> 0) {

    this.getEmpSheetT(this.employees.employeeId,this.monthNumber,this.yearNumber)

    //Swal.fire(this.translate.instant('info')!!, this.translate.instant('Attendenceisexist'), 'error')

  } else {
    this.timeSheets=null
      let i = 1;
      let lastDay=1;
      lastDay = this.getLastDay(this.monthNumber, this.yearNumber);

      while (i <= lastDay) {

        this.timeSheetData.attDay = i.toString();
        this.timeSheetData.attMonth = this.monthNumber.toString();
        this.timeSheetData.attYear = this.yearNumber.toString();
        this.timeSheetData.employee.employeeId = employeeId.toString();
        this.timeSheetData.overTimeHour = '0';
        this.timeSheetData.overTimeValue='0'
        this.timeSheetData.attHour = '8';
        this.timeSheetData.attValue = (parseFloat('8')*(this.salary/(lastDay*8))).toFixed(2);

        this.timeSheetData.saveFlag = '0';
        this.timeSheetData.attTotalValue = (parseFloat('8')*(this.salary/(lastDay*8))).toFixed(2);
        this.timeSheetData.attWeekDay=this.getDayName(new Date(this.yearNumber.toString()+'/'+this.monthNumber.toString()+'/'+i.toString()))



        //Call Add Service
        this.timeSheetService.addTimeSheet(this.timeSheetData).subscribe(
          (response: TimeSheet) => {
           // Swal.fire('Success', 'Attendence is added', 'success')
            Swal.fire(this.translate.instant('success')!!, this.translate.instant('AttendenceisAdded'), 'success')


          },
          (error) => {

            Swal.fire(this.translate.instant('error')!!, this.translate.instant('ErrorWhileAddingAttendence'), 'error')

          }
        );

        i += 1;
      }
      this.timeSheets=null
    this.getEmpSheetT(employeeId,this.monthNumber,this.yearNumber)
    this.getEmpSheetT(employeeId,this.monthNumber,this.yearNumber)
    }
  })
  }
  getDayName(date:Date){
    const weekday = ["Sun","Mon","Tus","Wed","Thu","Fri","Sat"];
    const d = new Date(date);
    let day = d.getDay()
return weekday[day];
  }



  salary=400;
getOtValue(event:Event){
var OtCount=(event.target as HTMLInputElement).value

  let daysInMonth =this.getLastDay(this.monthNumber,this.yearNumber);
  let otValue= (parseFloat(OtCount)*(this.salary/(daysInMonth*8))).toFixed(2)
  this.finalTotalOver +=parseFloat(OtCount)
  this.finalTotalOverValue +=parseFloat(otValue)
  return (parseFloat(OtCount)*(this.salary/(daysInMonth*8))).toFixed(2);

}




finalTotalofTotals=0

finalTotalAtt:number=0;
AttValue:number=0;
getEmpSheetT(employeeId:number,month:number,year:number){
  this.timeSheets=null
   if(employeeId && month && year){
    this.timeSheetService.getSheetofEmployeeS(employeeId, 1, month, year).subscribe((response: TimeSheet[]) => {

     this.saveToggle=true
      this.timeSheets = response;
     this.retriveCount= response.length;

       this.finalTotalAtt=0;
       this.finalTotalOver=0;
       this.finalTotalAttValue=0;
       this.finalTotalOverValue=0;

       for (const item of response){
        this.finalTotalAtt+= parseFloat(item.attHour)
       }

       for (const item of response){
        this.finalTotalOver+= parseFloat(item.overTimeHour)
       }

       for (const item of response){
        this.finalTotalAttValue+= parseFloat(item.attValue)
       }
       for (const item of response){
        this.finalTotalOverValue+= parseFloat(item.overTimeValue)
       }

    },
      (error) => {
        alert(error.message)
        Swal.fire('Error !', error.message, 'error'); }


    );}
      else{
      this.timeSheets=null;
     Swal.fire('Error !','Select Employee to Generate Time Sheet', 'error');}
}


  // public getContractDetailsByEmployeeId(emp:any){

  //   this.contractdService.getContractDetailsByEmployeeId(emp).subscribe(
  //     (data:any) => {

  //        if(data.length==0){

  //         Swal.fire(this.translate.instant('error')!!, this.translate.instant('ErrorAttContract'), 'error')

  //       }else{

  //      for(const item of data){

  //        this.salary += parseInt(item.allowanceAmount)}

  //     }}
  //   )

  // }
viewFlag=true;
toggleDivs(){
  this.viewFlag=false
}
  printPage() {
    this.viewFlag=false
    window.print();
  }
add(num1:string,num2:string){
  return Number(num1)+Number(num2)
}
addNum(num1:number,num2:number){
  return Number(num1)+Number(num2)
}
}



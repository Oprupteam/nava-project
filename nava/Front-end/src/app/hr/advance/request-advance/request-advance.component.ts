import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../employee/employee.service';
import { AdvanceService } from '../advance.service';
import { SectionService } from '../../section/section.service';


@Component({
  selector: 'app-advance-request',
  templateUrl: './request-advance.component.html',
  styleUrls: ['./request-advance.component.scss'],
})
export class RequestAdvanceComponent implements OnInit {

  // advanceAmount!: string;
  // numberOfInstallment!: string;
  // monthlyPayment!: number;
  employeeInfo: any;

  advanceData = {
    advanceId: '',
    submissionDate: '',
    advanceAmount: '',
    numberOfInstallment: '',
    monthlyPayment: 0,
    deductionStartMonth: '',
    deductionStartYear: '',
    approve: '',
    reason: '',
    paymentMethod: '',
    employee: {
      employeeId: '',
      employeeNameAr: '',
    },
  };
  deductionEndMonth: any;
  deductionEndYear: any;
  saveFlag = 0;
  // employeeService: any;
  constructor(
    private service: AdvanceService,
    private employeeService: EmployeeService,
    private sectionService: SectionService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  advances: any;
  employees: any;
  section: any;



  ngOnInit() {
    this.getAllEmployees();
  }
  calculate() {
    if (this.advanceData.advanceAmount == '' || this.advanceData.advanceAmount == null || parseInt(this.advanceData.advanceAmount) == 0) {
      Swal.fire(this.translate.instant('warning'), this.translate.instant('ErrorwhileaddingData'), 'warning')
    } else if (this.advanceData.numberOfInstallment == '' || this.advanceData.numberOfInstallment == null || parseInt(this.advanceData.advanceAmount) == 0) {
      Swal.fire(this.translate.instant('warning'), this.translate.instant('ErrorwhileaddingData'), 'warning')
    }
    this.advanceData.monthlyPayment = parseInt(this.advanceData.advanceAmount) / parseInt(this.advanceData.numberOfInstallment);
    // var startDate = new Date(parseInt(this.advanceData.deductionStartYear), parseInt(this.advanceData.deductionStartMonth),this.getLastDay(parseInt(this.advanceData.deductionStartMonth),parseInt(this.advanceData.deductionStartYear)));
    // var endDate = new Date(startDate.setMonth(startDate.getMonth()+parseInt(this.advanceData.numberOfInstallment)-1));
    var startMonth = parseInt(this.advanceData.deductionStartMonth);
    var startYear = parseInt(this.advanceData.deductionStartYear);
    var InstallmentNo = parseInt(this.advanceData.numberOfInstallment);
    var m = 0;
    var y = 0;
    m = startMonth + InstallmentNo
    //alert(m)
    if (m >= 12) {
      y = Math.floor(m / 12);
      m = m % 12
    }
    //alert("m is " +m +"\n"+ "y is " + (y))

    this.deductionEndMonth = m.toString();
    this.deductionEndYear = (startYear + y).toString();

  }
  onAddAdvance() {

    // document.getElementById('add-vacation-form')?.click();
    // this.getAppEmp();
    this.saveFlag = 0;
    // alert(this.saveFlag)
    if (this.saveFlag == 0) {
      console.log(this.advanceData);

      this.service.addAdvance(this.advanceData).subscribe(
        (data: any) => {
          this.advanceData.employee.employeeId = '';
          this.advanceData.submissionDate = '';
          this.advanceData.advanceAmount = '';
          this.advanceData.monthlyPayment = 0;
          Swal.fire(this.translate.instant('success'), this.translate.instant('Dataisadded'), 'success')
          this.goAdvances();
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('ErrorwhileupdatingData'), 'error')
          console.log(error);
        }
      );
    } else { Swal.fire(this.translate.instant('Error'), this.translate.instant('ErrorwhileupdatingData'), 'error') }
  }
  public getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response: any) => {
        this.employees = response;

      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
      }
    );
  }
  goAdvances() {
    this.router.navigate(['/advance/view']);
  }
  getAppEmp(): void {
    this.service.getAdvanceByApproveEmpId(parseInt(this.advanceData.employee.employeeId)).subscribe((response: any) => {
      InstallmentNo = 0;
      this.advances = response;
      for (const item of this.advances) {
        var startMonth = item.deductionStartMonth;
        var startYear = item.deductionStartYear;
        var InstallmentNo = item.numberOfInstallment
        var currentMonth = 0; var currentYear = 0;
        currentMonth = parseInt(this.advanceData.deductionStartMonth)
        currentYear = parseInt(this.advanceData.deductionStartYear)
        var m = 0;
        var y = 0;
        if (currentMonth >= startMonth) {
          m = currentMonth - startMonth
          y = currentYear - startYear
        }
        else {
          m = currentMonth + 12 - startMonth
          y = currentYear - 1 - (startYear)
        }
        var nInstallmentNo = parseInt(InstallmentNo) - m + y * 12
        if (nInstallmentNo > 0)
          //  alert(nInstallmentNo)
          this.saveFlag += 1
        break;
      }
    },
    )
  }
  getEmployeeInfo(event: any) {

    this.employeeService.getEmployeeById(event).subscribe((data: any) => {

      this.employeeInfo = data;
      console.log("this.employeeInfo", this.employeeInfo)

    }

    )

  }
  getSectionByEmpId(event: any){
    this.sectionService.getSectionByEmpId(event).subscribe(
      data =>{ 
        if(data.length >= 0){
        let len = data.length - 1
        this.section = data[len]  }
        else
          this.section = data
     console.log(this.section)
    })
   }

}

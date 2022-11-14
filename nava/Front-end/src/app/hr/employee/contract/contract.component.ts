import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { ContractBenefits, ContractVacation } from '../employee'
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  employeeId=this.activateRoute.snapshot.params['id'];
  employees:any;
  empResidence:any;
  addresses:any;
  vacations:any;
  salaryObjects:any;
  benefits:any;
  tabs = true;
  hid :any;
  empVacation:any;
  empSalaryObject:any;
  empBenefits:any;
  

  contractData = {
    employee: {
      employeeId: this.employeeId
    },
    contractType: '',
    startDate: '',
    endDate: ''
  }

  contractVacationData = {
    amount: '',
    vacation:{
      vacationId:'',
    },
    contract:{
      contractId: ''
    }
  }
  

  contractSalaryObjectData = {
    amount: '',
    type: '',
    salaryObject:{
     salaryObjectId:''
    },
    contract:{
      contractId: ''
    }
  }

  contractBenefitsData = {
    amount: '',
    benefits:{
      benefitsId:'',
    },
    contract:{
      contractId: ''
    }
  }

  constructor(
    private modalService: NgbModal,
    private activateRoute:ActivatedRoute,
    private employeeService: EmployeeService,
    private translate:TranslateService,
    private toaster:ToastrService,

  ) { }

  ngOnInit(): void {
    this.getResidenceByEmployeeId()
    this.getEmployeeByEmployeeId()
    this.getAddressById()
    this.getAllVacations()
    this.getAllBenefits()
    this.getAllSalaryObjects()
    if(this.contractSalaryObjectData.contract.contractId != ''){
    this.getVacationByContractId()
    this.getBenefitsByContractId()
    this.getSalaryObjectByContractId()
  }
  }

  Select2Open(select2modal:any) {

    this.modalService.open(select2modal);
  }

  getEmployeeByEmployeeId=()=>{
    this.employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
     this.employees=data   
    })
   }

   getResidenceByEmployeeId(){
    this.employeeService.getResidenceByEmployeeId(this.employeeId)
    .subscribe(data =>{ 
      if(data.length >= 0){
      let len = data.length - 1
      this.empResidence = data[len]  }
      else
        this.empResidence = data

    })
  }

    getAddressById(){
      this.employeeService.getAddressById()
      .subscribe(data => {
        if(data.length >= 0){
        let len = data.length - 1
        this.addresses = data[len]  }
        else
          this.addresses = data
          
      })
    }
    getAllVacations(){
      this.employeeService.getAllVacations()
      .subscribe(data => this.vacations = data)
    }
    getAllSalaryObjects(){
      this.employeeService.getAllSalaryObjects()
      .subscribe(data => this.salaryObjects = data)
    }
    getAllBenefits(){
      this.employeeService.getAllBenefits()
      .subscribe(data => this.benefits = data)
    }

    getVacationByContractId=()=>{
      this.employeeService.getVacationByContractId(this.contractVacationData.contract.contractId).subscribe(data=>{
       this.empVacation=data   
       this.modalService.dismissAll();
       this.toaster.success(this.translate.instant('success'))
      })
     }
     getSalaryObjectByContractId=()=>{
      this.employeeService.getSalaryObjectByContractId(this.contractSalaryObjectData.contract.contractId).subscribe(data=>{
       this.empSalaryObject=data   
       this.modalService.dismissAll();
       this.toaster.success(this.translate.instant('success'))
       this.calcSalary()
      })
     }

     getBenefitsByContractId=()=>{
      this.employeeService.getBenefitsByContractId(this.contractBenefitsData.contract.contractId).subscribe(data=>{
       this.empBenefits=data   
       this.modalService.dismissAll();
       this.toaster.success(this.translate.instant('success'))
      })
     }


    addVacation(){
      this.employeeService.addContractVacation(this.contractVacationData).subscribe(() => {
        this.toaster.success(this.translate.instant('success'))
        this.getVacationByContractId()
      })
    }
   
    addBenefits(){
      this.employeeService.addContractBenefits(this.contractBenefitsData).subscribe(() => {
        this.toaster.success(this.translate.instant('success'))
        this.getBenefitsByContractId()
      })
    }

    addSalaryObject(){
      this.employeeService.addContractSalaryObject(this.contractSalaryObjectData).subscribe(() => {
        this.toaster.success(this.translate.instant('success'))
        this.getSalaryObjectByContractId()
      })
    }

    max(){
      this.employeeService.max().subscribe((data: any)=>{
        this.contractVacationData.contract.contractId = data
        this.contractBenefitsData.contract.contractId = data
        this.contractSalaryObjectData.contract.contractId = data

      })
    }

    sum = 0
    m = 0
    s = 0
    calcSalary(){
      this.sum = 0
      this.m = 0
      this.s = 0
      for (let sal of this.empSalaryObject) {
        if(sal.type === '-1')
          this.s = this.s + sal.amount
        if(sal.type === '1')
          this.m = this.m + sal.amount
        }
        this.sum = this.m - this.s
    }
   

    public addContract(): void{
      this.employeeService.addEmployeeContract(this.contractData).subscribe(
        () => {
          this.toaster.success(this.translate.instant('success'))
          this.tabs = false
          this.hid = true
          this.max()
        }
        )
    }

    printV:any;
    print() {
      let content = `<h1>OprUp</h1>`+
      ``
      this.printV = window.open('', 'PRINT', '');
      this.printV.document.write('<html><head><title></title></head><style>@page { size: auto;  margin: 0mm; }</style><body>');
      this.printV.document.write('<h1>' + content  + '</h1>');
      this.printV.document.write('</body></html>');
      this.printV.document.close(); // necessary for IE >= 10
      this.printV.focus(); // necessary for IE >= 10*/
      this.printV.print();
    }


    deleteVacation(vacationId: ContractVacation){
      Swal.fire({
        icon: 'info',
        title: this.translate.instant('Are you Sure to delete The Record'),
        confirmButtonText:  'Delete',
        showCancelButton: true,
      }).then((result) => {
        if(result.isConfirmed){
          this.employeeService.deleteContractVacation(vacationId).subscribe(
            (response) => {
              Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
             this.toaster.success(this.translate.instant('success'))
             this.getVacationByContractId()
            }
          );
        }
      })
    }
    deleteBenefits(benefitsId: ContractBenefits){
      Swal.fire({
        icon: 'info',
        title: this.translate.instant('Are you Sure to delete The Record'),
        confirmButtonText:  'Delete',
        showCancelButton: true,
      }).then((result) => {
        if(result.isConfirmed){
          this.employeeService.deleteContractBenefits(benefitsId).subscribe(
            (response) => {
              Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
             this.toaster.success(this.translate.instant('success'))
             this.getBenefitsByContractId()
            }
          );
        }
      })
    }
    // deleteSalaryObject(benefitsId: ContractBenefits){
    //   Swal.fire({
    //     icon: 'info',
    //     title: this.translate.instant('Are you Sure to delete The Record'),
    //     confirmButtonText:  'Delete',
    //     showCancelButton: true,
    //   }).then((result) => {
    //     if(result.isConfirmed){
    //       this.employeeService.deleteContractSalaryObject(benefitsId).subscribe(
    //         (response) => {
    //           Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
    //          this.toaster.success(this.translate.instant('success'))
    //          this.getContractSalaryObjectByContractId()
    //         }
    //       );
    //     }
    //   })
    // }
    
}

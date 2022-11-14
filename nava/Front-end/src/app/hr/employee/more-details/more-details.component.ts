import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { SortEvent } from 'src/app/shared/directives/soratable.directive';
import { EmployeeService } from '../employee.service';
import { UniversityService } from '../../university/university.service';
import { QualificationService } from '../../qualification/qualification.service';
import { BankService } from '../../bank/bank.service';
import { DepartmentService } from '../../department/department.service';
import { SectionService } from '../../section/section.service';
import { InsuranceCompanyService } from '../../insurance-company/insurance-company.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeBank, EmployeeInsuranceCompany, EmployeeQualification, Address, EmployeeJobInformation, EmployeeExperience, EmployeeResidence, EmployeeVisa,EmployeeMedicalTest } from '../employee';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MajorService } from '../../major/major.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss']
})
export class MoreDetailsComponent implements OnInit {
  employeeId=this.activateRoute.snapshot.params['id'];

  selectAFile: File = null as any;
  filesPreview: File[] = [];
  img: any;
  headers: any;
  service: any;
  
  count = 1;
  counter(){
    this.count = this.count + 1
  }

  constructor(
    public employeeService: EmployeeService,
    private modalService: NgbModal,
    private activateRoute:ActivatedRoute,
    private qualificationService: QualificationService,
    private universityService: UniversityService,
    private bankService: BankService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
    private insuranceCompanyService: InsuranceCompanyService,
    private translate: TranslateService,
    private toaster:ToastrService,
    private majorService: MajorService,
  ) { }


  employeeData = {
    employeeNameAr: '',
    employeeName: '',
    employeeCode: '',
    gender: '',
    image: '',
    BOD: ''
  }
  employeeQualificationData = {
    employee: {
      employeeId: this.employeeId
    },
    qualification: {
        qualificationId: ''
    },
    university: {
      universityId: ''
    },
    major: {
        majorId: ''
    }
  }
  employeeJobInfoData = {
    employee: {
      employeeId: this.employeeId
    },
    department: {
      departmentId: ''
    },
    section: {
      sectionId: ''
    },
    jobTitle: {
      jobTitleId: ''
    }
  }
  employeeBankData = {
    employee: {
      employeeId: this.employeeId
    },
    bank: {
        bankId: ''
    }
  }
  employeeInsuranceCompanyData = {
      insurancePolicyNumber: '',
      insurancePolicyType: '',
      issueDate: '',
      expiryDate: '',
      insuranceDegree: '',
      insuranceCompany: {
          insuranceCompanyId: ''
      },
      employee: {
          employeeId: this.employeeId
      }
  }
  employeeJobTitleData = {
    employee: {
      employeeId: this.employeeId
    },
    jobTitle: {
      jobTitleId: ''
    }
  }
  employeeUniversityData = {
    employee: {
      employeeId: this.employeeId
    },
    university: {
      universityId: ''
    }
  }
  employeeMajorData = {
    employee: {
      employeeId: this.employeeId
    },
    major: {
      majorId: ''
    }
  }
  addressData= {
    employee: {
      employeeId: this.employeeId
    },
    addressName: '',
    email: '',
    phoneNumber: ''
  }
  experienceData= {
    employee: {
      employeeId: this.employeeId
    },
    company: '',
    startDate: '',
    endDate: '',
    position: ''
  }
  residencData= {
    employee: {
      employeeId: this.employeeId
    },
    residenceNumber: '',
    jobBYResidence: '',
    residenceIssueDate: '',
    residenceExpiryDate: '',
    sponsorTransferDate: '',
    hijriSponsorTransferDate: ''
  }
  visaData= {
    employee: {
      employeeId: this.employeeId
    },
    visaName: '',
    visaType: '',
    jobByVisa: '',
    entryDate: '',
    visaIssueDate: '',
    visaExpiryDate: ''
  }
  medicalTestData= {
    employee: {
      employeeId: this.employeeId
    },
    medicalTestNumber: '',
    medicalTestResult: '',
    procedureDate: '',
    medicalResultDate: ''
  }

  qualification!: any;
  banks:any;
  empBanks:any;
  insuranceCompanies:any;
  empInsuranceCompanies:any;
  jobTitles:any;
  qualifications:any;
  empQualifications: any;
  empJobsInformation: any;
  universities:any;
  majors:any;
  employees:any;
  addresses: any;
  departments: any;
  sections: any;
  empExperience:any;
  empResidence: any;
  empVisa: any;
  empMedicalTest: any;

  sectionByDepartment:any;

  

  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach((header: { sortable: any; direction: string; }) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  Select2Open(select2modal:any) {

    this.modalService.open(select2modal);

  }

  // upload img
  onPreviewFileSelect(event:any) {
    // console.log(event.addedFiles[0].name)
    if(this.filesPreview.length<1)
      {
      // console.log(event);
		  this.filesPreview.push(...event.addedFiles);
      this.img = event.addedFiles
      this.employeeData.image = 'assets/img/upload/'+event.addedFiles[0].name
      }
	}
  onPreviewFileRemove(event:any) {
		// console.log(event);
		this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
	}

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  
  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    this.employeeService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    // console.log(httpEvent)
    switch(httpEvent.type) {
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          // console.log(httpEvent);
          break;
      
    }
  }
// upload img

  
  ngOnInit(): void {
    this.getAllQualifications()
    this.getAllBanks()
    this.getAllSections()
    this.getAllDepartments()
    this.getAllInsuranceCompanies()
    this.getBanksByEmployeeId()
    this.getInsuranceCompaniesByEmployeeId()
    this.getAllUniversities()
    this.getAllMajors()
    this.getEmployeeByEmployeeId()
    this.getAllJobTitles()
    this.getQualificationsByEmployeeId()
    this.getJobsInformationByEmployeeId()
    this.getAddressById()
    this.getExperienceByEmployeeId()
    this.getResidenceByEmployeeId()
    this.getVisaByEmployeeId()
    this.getMedicalTestByEmployeeId()

  }

  addQualification(){
    console.log(this.employeeQualificationData);
    this.employeeService.addEmployeeQualification(this.employeeQualificationData).subscribe(() => {
        this.getQualificationsByEmployeeId()
        this.modalService.dismissAll();
        this.toaster.success(this.translate.instant('success'))
      }),
      (error: HttpErrorResponse) => {
        this.toaster.success(this.translate.instant('error'))
      };
  }

  addJobInfo(){
    console.log(this.employeeJobInfoData);
    this.employeeService.addJobInfo(this.employeeJobInfoData).subscribe(() => {
      this.getJobsInformationByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
      (error: HttpErrorResponse) => {
        this.toaster.success(this.translate.instant('error'))
      };
  }

  addAddress(){
    console.log(this.addressData);
    this.employeeService.addAddress(this.addressData).subscribe(() => {
      this.getAddressById()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
      (error: HttpErrorResponse) => {
        this.toaster.success(this.translate.instant('error'))
      };
  }

  addBank(){
    this.employeeService.addEmployeeBank(this.employeeBankData).subscribe(() => {
      this.getBanksByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => {
      this.toaster.success(this.translate.instant('error'))
    };
    console.log(this.employeeBankData);
  }
  
  addInsuranceCompany(){
    this.employeeService.addEmployeeInsuranceCompany(this.employeeInsuranceCompanyData).subscribe(() => {
      this.getInsuranceCompaniesByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => {
      this.toaster.success(this.translate.instant('error'))
    };
    console.log(this.employeeInsuranceCompanyData);
  }

  addExperience(){
    console.log(this.experienceData);
    this.employeeService.addEmployeeExperience(this.experienceData).subscribe(() => {
      this.getExperienceByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => {   
      this.toaster.success(this.translate.instant('error'))
    };
  }

  addResidence(){
    console.log(this.residencData);
    this.employeeService.addEmployeeResidence(this.residencData).subscribe(() => {
      this.getResidenceByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => { 
      this.toaster.success(this.translate.instant('error'))
    };
  }

  addVisa(){
    console.log(this.visaData);
    this.employeeService.addEmployeeVisa(this.visaData).subscribe(() => {
      this.getVisaByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => {  
      this.toaster.success(this.translate.instant('error'))      
    };
  }

  addMedicalTest(){
    console.log(this.medicalTestData);
    this.employeeService.addEmployeeMedicalTest(this.medicalTestData).subscribe(() => {
      this.getMedicalTestByEmployeeId()
      this.modalService.dismissAll();
      this.toaster.success(this.translate.instant('success'))
    }),
    (error: HttpErrorResponse) => {    
      this.toaster.success(this.translate.instant('error'))
    };
  }

  getBanksByEmployeeId=()=>{
    this.employeeService.getBanksByEmployeeId(this.employeeId).subscribe(data=>{
     this.empBanks=data   
    })
    console.log(this.empBanks)
   }

   getQualificationsByEmployeeId=()=>{
    this.employeeService.getQualificationsByEmployeeId(this.employeeId).subscribe(data=>{
     this.empQualifications=data   
    })
    console.log(this.empQualifications)
   }

   getJobsInformationByEmployeeId=()=>{
    this.employeeService.getJobsInformationByEmployeeId(this.employeeId).subscribe(data=>{
      this.empJobsInformation=data   
     })
     console.log(this.empJobsInformation)
   }
   
   getEmployeeByEmployeeId=()=>{
    this.employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
     this.employees=data   
    })
   }

   getInsuranceCompaniesByEmployeeId=()=>{
    this.employeeService.getInsuranceCompaniesByEmployeeId(this.employeeId).subscribe(data=>{
     this.empInsuranceCompanies=data   
    })
    console.log(this.empInsuranceCompanies)
   }

   getExperienceByEmployeeId(){
    this.employeeService.getExperienceByEmployeeId(this.employeeId)
    .subscribe(data => this.empExperience = data)
    console.log(this.empExperience)
  }

  getResidenceByEmployeeId(){
    this.employeeService.getResidenceByEmployeeId(this.employeeId)
    .subscribe(data => this.empResidence = data)
    console.log(this.empResidence)
  }
  getVisaByEmployeeId(){
    this.employeeService.getVisaByEmployeeId(this.employeeId)
    .subscribe(data => this.empVisa = data)
    console.log(this.empVisa)
  }
  getMedicalTestByEmployeeId(){
    this.employeeService.getMedicalTestByEmployeeId(this.employeeId)
    .subscribe(data => this.empMedicalTest = data)
    console.log(this.empMedicalTest)
  }

  getAllQualifications(){
    this.qualificationService.getAllQualifications()
    .subscribe(data => this.qualification = data)
    console.log(this.qualification)
  }

  getAllJobTitles(){
    this.employeeService.getAllJobTitles()
    .subscribe(data => this.jobTitles = data)
    console.log(this.jobTitles)
  }

  getAllUniversities(){
     this.universityService.getAllUniversities()
     .subscribe(data => this.universities = data)
   }

   getAllMajors(){
    this.majorService.getAllMajors()
    .subscribe(data => this.majors = data)
  }

  getAllBanks(){
    this.bankService.getAllBanks()
    .subscribe(data => this.banks = data)
    console.log(this.banks)
  }

  getAllDepartments(){
    this.departmentService.getAllDepartments()
    .subscribe(data => this.departments = data)
    console.log(this.departments)
  }

  getAllSections(){
    this.sectionService.getAllSections()
    .subscribe(data => this.sections = data)
    console.log(this.sections)
  }

  getAddressById(){
    this.employeeService.getAddressById()
    .subscribe(data => this.addresses = data)
    console.log(this.addresses)
  }
  
  getAllInsuranceCompanies(){
    this.insuranceCompanyService.getAllInsuranceCompanies()
    .subscribe(data => this.insuranceCompanies = data)
    console.log(this.insuranceCompanies)
  }

  getSectionByDepartment = (event: any) => {
    this.sectionByDepartment = this.sections.filter((element: any) => {
      return element.department.departmentId == event && element.deleteFlag != 0;
    });
  };

  deleteJobInformation(jobInfoId: EmployeeJobInformation){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText:  'Delete',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.employeeService.deleteJobInformation(jobInfoId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
           this.getJobsInformationByEmployeeId()
          },
          (error) => {
            Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
            this.toaster.success(this.translate.instant('error'))
          }
        );
      }
    })
}
  deleteQualification(employeeQualificationId: EmployeeQualification){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText:  'Delete',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.employeeService.deleteEmpQualification(employeeQualificationId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
           this.getQualificationsByEmployeeId()
          },
          (error) => {
            Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
            this.toaster.success(this.translate.instant('error'))
          }
        );
      }
    })
}
  deleteInsuranceCompany(insuranceCompanyId: EmployeeInsuranceCompany){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText:  'Delete',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.employeeService.deleteEmpInsurCom(insuranceCompanyId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
           this.getInsuranceCompaniesByEmployeeId()
          },
          (error) => {
            Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
            this.toaster.success(this.translate.instant('error'))
          }
        );
      }
    })
}
  deleteBank(empBankId: EmployeeBank){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteEmpBank(empBankId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getBanksByEmployeeId()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }


  })
}
  deleteAddress(addressId: Address){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteAddress(addressId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getAddressById()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }


  })
}
  deleteExperience(experienceId: EmployeeExperience){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteExperience(experienceId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getExperienceByEmployeeId()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }
  })
}
deleteResidence(residenceId: EmployeeResidence){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteResidence(residenceId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getResidenceByEmployeeId()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }
  })
}
deleteVisa(visaId: EmployeeVisa){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteVisa(visaId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getVisaByEmployeeId()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }
  })
}
deleteMedicalTest(MedicalTestId: EmployeeMedicalTest){
  Swal.fire({
    icon: 'info',
    title: this.translate.instant('Are you Sure to delete The Record'),
    confirmButtonText:  'Delete',
    showCancelButton: true,
  }).then((result) => {
    if(result.isConfirmed){
      this.employeeService.deleteMedicalTest(MedicalTestId).subscribe(
        (response) => {
          Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
         this.toaster.success(this.translate.instant('success'))
         this.getMedicalTestByEmployeeId()
        },
        (error) => {
          Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
          this.toaster.success(this.translate.instant('error'))
        }
      );
    }
  })
}

}

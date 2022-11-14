import { EmployeeTypeComponent } from "../employee-type/employee-type/employee-type.component";

export interface Employee {
    employeeId: string;
    employeeName: string;
    employeeNameAr: string;

    gender: string;
    employeeCode: string;
    image: string;
    placeOfBirth:string;
   // dateOfBirth:string;
    nationality:string;
    religion:string;
    maritalStatus:string;
    employeeTypes:string;

    jobStatus:string;
    employeeAddress:string;
    passportNumber:string;
    //hijriDateOfJoin:string;

    vacationNumber:string;

    deleteFlag: number;


}
export interface EmployeeQualification {
    employee: {
        employeeId: string;
      },
    qualification: {
        qualificationId: string;
      },
      university: {
        universityId: string;
      },
      major: {
          majorId: string;
      }
}

export interface EmployeeJobInformation {
  employee: {
      employeeId: string;
    },
  department: {
    departmentId: string;
    },
    section: {
      sectionId: string;
    },
    jobTitle: {
      jobTitleId: string;
    }
}

export interface EmployeeBank  {
  employee: {
    employeeId: string
  },
  bank: {
      bankId: string,
      // bankName: string
  }
}

export interface EmployeeInsuranceCompany  {
    insurancePolicyNumber: string,
    insurancePolicyType: string,
    issueDate: string,
    expiryDate: string,
    insuranceDegree: string,
    insuranceCompany: {
        insuranceCompanyId: string
    },
    employee: {
        employeeId: string
    }
}

export interface EmployeeJobTitle  {
  employee: {
    employeeId: string
  },
  jobTitle: {
    jobTitleId: string
  }
}

export interface EmployeeUniversity  {
  employee: {
    employeeId: string
  },
  university: {
    universityId: string
  }
}

export interface EmployeeMajor  {
  employee: {
    employeeId: string
  },
  major: {
    majorId: string
  }
}

export interface Address{
  employee: {
    employeeId: any
  },
  addressName: string,
  email: string,
  phoneNumber: string
}

export interface EmployeeExperience{
  employee: {
    employeeId: any
  },
  company: string,
  startDate: string,
  endDate: string,
  position: string
}

export interface EmployeeResidence{
  employee: {
    employeeId: string
  },
  residenceNumber: string,
  jobBYResidence: string,
  residenceIssueDate: string,
  residenceExpiryDate: string,
  sponsorTransferDate: string,
  hijriSponsorTransferDate: string
}

export interface EmployeeVisa{
  employee: {
    employeeId: string
  },
  visaName: string,
  visaType: string,
  jobByVisa: string,
  entryDate: string,
  visaIssueDate: string,
  visaExpiryDate: string
}
export interface EmployeeMedicalTest{
  employee: {
    employeeId: string
  },
  medicalTestNumber: string,
  medicalTestResult: string,
  procedureDate: string,
  medicalResultDate: string
}

export interface Contract {
  employee: {
    employeeId: string
  },
  contractType: string,
  startDate: string,
  endDate: string
}

export interface ContractVacation{
  amount: string,
  vacation:{
    vacationId:string,
  },
  contract:{
    contractId:string,
  }
}
export interface ContractSalaryObject{
  amount: string,
  type: string,
  salaryObject:{
    salaryObjectId:string,
  },
  contract:{
    contractId:string,
  }
}
export interface ContractBenefits{
  amount: string,
  benefits:{
    benefitsId:string,
  },
  contract:{
    contractId:string,
  }
}

export interface Vacation{
  vacationType: string,
  vacationDescription: string,
}
export interface Benefits{
  benefitsType: string,
  benefitsDescription: string,
}

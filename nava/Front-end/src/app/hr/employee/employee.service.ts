import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Benefit } from '../benefit/benefit';
import { InsuranceCompany } from '../insurance-company/insurance-company';
import { JobTitle } from '../job-title/job-title';
import { SalaryObject } from '../salary-object/salary-object';
import { Benefits, ContractBenefits, ContractSalaryObject, Employee, EmployeeJobInformation } from './employee';
import { EmployeeQualification, EmployeeBank, EmployeeInsuranceCompany, EmployeeJobTitle, EmployeeUniversity, EmployeeMajor, Address, EmployeeExperience, EmployeeResidence, EmployeeVisa, EmployeeMedicalTest, Contract, Vacation, ContractVacation } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  get() {
    throw new Error('Method not implemented.');
  }

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) { }


  public upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public addEmployee(employee: Employee): Observable<Employee[]>{
    return this.http.post<Employee[]>(`${this.apiServerUrl}/employee/add`,employee)
  }

  public getAddressById(): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiServerUrl}/address/all`)
  }

  public getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
  }

  public getAllJobTitles(): Observable<JobTitle[]>{
    return this.http.get<JobTitle[]>(`${this.apiServerUrl}/jobTitle/all`)
  }

  public getEmployeeById(employeeId: any): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/find/${employeeId}`)
  }

  public deleteEmployee(employeeId: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/delete/${employeeId}`,employeeId);

  }

  public updateEmployee(employeeId: Employee): Observable<Employee[]>{
    return this.http.put<Employee[]>(`${this.apiServerUrl}/employee/update`, employeeId)
  }

  public addEmployeeQualification(employeeQualification: EmployeeQualification): Observable<EmployeeQualification[]>{
    return this.http.post<EmployeeQualification[]>(`${this.apiServerUrl}/employeeQualification/add`,employeeQualification)
  }

  public addJobInfo(empJobInformation: EmployeeJobInformation): Observable<EmployeeJobInformation[]>{
    return this.http.post<EmployeeJobInformation[]>(`${this.apiServerUrl}/jobInfo/add`,empJobInformation)
  }

  public addAddress(address: Address): Observable<Address[]>{
    return this.http.post<Address[]>(`${this.apiServerUrl}/address/add`,address)
  }

  public addEmployeeBank(employeeBank: EmployeeBank): Observable<EmployeeBank[]>{
    return this.http.post<EmployeeBank[]>(`${this.apiServerUrl}/employeeBank/add`,employeeBank)
  }

  public addEmployeeInsuranceCompany(employeeInsuranceCompany: EmployeeInsuranceCompany): Observable<EmployeeInsuranceCompany[]>{
    return this.http.post<EmployeeInsuranceCompany[]>(`${this.apiServerUrl}/employeeInsuranceCompany/add`,employeeInsuranceCompany)
  }

  public addEmployeeJobTitle(employeeJobTitle: EmployeeJobTitle): Observable<EmployeeJobTitle[]>{
    return this.http.post<EmployeeJobTitle[]>(`${this.apiServerUrl}/employeeJobTitle/add`,employeeJobTitle)
  }

  public addEmployeeUniversity(employeeUniversity: EmployeeUniversity): Observable<EmployeeUniversity[]>{
    return this.http.post<EmployeeUniversity[]>(`${this.apiServerUrl}/employeeUniversity/add`,employeeUniversity)
  }

  public addEmployeeMajor(employeeMajor: EmployeeMajor): Observable<EmployeeMajor[]>{
    return this.http.post<EmployeeMajor[]>(`${this.apiServerUrl}/employeeMajor/add`,employeeMajor)
  }


  public addEmployeeExperience(employeeExperience: EmployeeExperience): Observable<EmployeeExperience[]>{
    return this.http.post<EmployeeExperience[]>(`${this.apiServerUrl}/experience/add`,employeeExperience)
  }

  public addEmployeeResidence(employeeResidence: EmployeeResidence): Observable<EmployeeResidence[]>{
    return this.http.post<EmployeeResidence[]>(`${this.apiServerUrl}/residence/add`,employeeResidence)
  }

  public addEmployeeVisa(employeeVisa: EmployeeVisa): Observable<EmployeeVisa[]>{
    return this.http.post<EmployeeVisa[]>(`${this.apiServerUrl}/visa/add`,employeeVisa)
  }

  public addEmployeeMedicalTest( employeeMedicalTest: EmployeeMedicalTest): Observable<EmployeeMedicalTest[]>{
    return this.http.post<EmployeeMedicalTest[]>(`${this.apiServerUrl}/medicalTest/add`,employeeMedicalTest)
  }

  public addEmployeeContract( employeeContract: Contract): Observable<Contract[]>{
    return this.http.post<Contract[]>(`${this.apiServerUrl}/contract/add`,employeeContract)
  }

  public addContractVacation(contractVacation: ContractVacation): Observable<ContractVacation[]>{
    return this.http.post<ContractVacation[]>(`${this.apiServerUrl}/contractVacation/add`,contractVacation)
  }
  public addContractSalaryObject(contractSalaryObject: ContractSalaryObject): Observable<ContractSalaryObject[]>{
    return this.http.post<ContractSalaryObject[]>(`${this.apiServerUrl}/contractSalaryObject/add`,contractSalaryObject)
  }
  public addContractBenefits(contractBenefits: ContractBenefits): Observable<ContractBenefits[]>{
    return this.http.post<ContractBenefits[]>(`${this.apiServerUrl}/contractBenefits/add`,contractBenefits)
  }

  public getBanksByEmployeeId(employeeId: any): Observable<EmployeeBank[]>{
    return this.http.get<EmployeeBank[]>(`${this.apiServerUrl}/employeeBank/find/${employeeId}`)
  }

  public getInsuranceCompaniesByEmployeeId(employeeId: any): Observable<EmployeeInsuranceCompany[]>{
    return this.http.get<EmployeeInsuranceCompany[]>(`${this.apiServerUrl}/employeeInsuranceCompany/find/${employeeId}`)
  }

  public getQualificationsByEmployeeId(employeeId: any): Observable<EmployeeQualification[]>{
    return this.http.get<EmployeeQualification[]>(`${this.apiServerUrl}/employeeQualification/find/${employeeId}`)
  }

  public getJobsInformationByEmployeeId(employeeId: any): Observable<EmployeeJobInformation[]>{
    return this.http.get<EmployeeJobInformation[]>(`${this.apiServerUrl}/jobInfo/find/${employeeId}`)
  }

  public getExperienceByEmployeeId(employeeId: any): Observable<EmployeeExperience[]>{
    return this.http.get<EmployeeExperience[]>(`${this.apiServerUrl}/experience/find/${employeeId}`)
  }

  public getResidenceByEmployeeId(employeeId: any): Observable<EmployeeResidence[]>{
    return this.http.get<EmployeeResidence[]>(`${this.apiServerUrl}/residence/find/${employeeId}`)
  }

  public getVisaByEmployeeId(employeeId: any): Observable<EmployeeVisa[]>{
    return this.http.get<EmployeeVisa[]>(`${this.apiServerUrl}/visa/find/${employeeId}`)
  }

  public getMedicalTestByEmployeeId(employeeId: any): Observable<EmployeeMedicalTest[]>{
    return this.http.get<EmployeeMedicalTest[]>(`${this.apiServerUrl}/medicalTest/find/${employeeId}`)
  }

  public getAllVacations(): Observable<Vacation[]>{
    return this.http.get<Vacation[]>(`${this.apiServerUrl}/vacation/all`)
  }
  public getAllSalaryObjects(): Observable<SalaryObject[]>{
    return this.http.get<SalaryObject[]>(`${this.apiServerUrl}/salaryObject/all`)
  }
  public getAllBenefits(): Observable<Benefits[]>{
    return this.http.get<Benefits[]>(`${this.apiServerUrl}/benefits/all`)
  }

  public getVacationByContractId(contractId: any): Observable<ContractVacation[]>{
    return this.http.get<ContractVacation[]>(`${this.apiServerUrl}/contractVacation/find/${contractId}`)
  }
  public getSalaryObjectByContractId(contractId: any): Observable<ContractSalaryObject[]>{
    return this.http.get<ContractSalaryObject[]>(`${this.apiServerUrl}/contractSalaryObject/find/${contractId}`)
  }
  public getBenefitsByContractId(contractId: any): Observable<ContractBenefits[]>{
    return this.http.get<ContractBenefits[]>(`${this.apiServerUrl}/contractBenefits/find/${contractId}`)
  }

  public deleteEmpBank(empBankId: EmployeeBank): Observable<EmployeeBank>{
    return this.http.put<EmployeeBank>(`${this.apiServerUrl}/employeeBank/delete/${empBankId}`,empBankId);
  }

  public deleteAddress(addressId: Address): Observable<Address>{
    return this.http.put<Address>(`${this.apiServerUrl}/address/delete/${addressId}`,addressId);
  }

  public deleteExperience(experienceId: EmployeeExperience): Observable<EmployeeExperience>{
    return this.http.put<EmployeeExperience>(`${this.apiServerUrl}/experience/delete/${experienceId}`,experienceId);
  }

  public deleteResidence(residenceId: EmployeeResidence): Observable<EmployeeResidence>{
    return this.http.put<EmployeeResidence>(`${this.apiServerUrl}/residence/delete/${residenceId}`,residenceId);
  }

  public deleteVisa(visaId: EmployeeVisa): Observable<EmployeeVisa>{
    return this.http.put<EmployeeVisa>(`${this.apiServerUrl}/visa/delete/${visaId}`,visaId);
  }

  public deleteMedicalTest(medicalTestId: EmployeeMedicalTest): Observable<EmployeeMedicalTest>{
    return this.http.put<EmployeeMedicalTest>(`${this.apiServerUrl}/medicalTest/delete/${medicalTestId}`,medicalTestId);
  }

  public deleteEmpQualification(empQualificationId: EmployeeQualification): Observable<EmployeeQualification>{
    console.log(empQualificationId)
    return this.http.put<EmployeeQualification>(`${this.apiServerUrl}/employeeQualification/delete/${empQualificationId}`,empQualificationId);
  }

  public deleteJobInformation(empJobInformationId: EmployeeJobInformation): Observable<EmployeeJobInformation>{
    console.log(empJobInformationId)
    return this.http.put<EmployeeJobInformation>(`${this.apiServerUrl}/jobInfo/delete/${empJobInformationId}`,empJobInformationId);
  }

  public deleteEmpInsurCom(empInsurComId: EmployeeInsuranceCompany): Observable<InsuranceCompany>{
    return this.http.put<InsuranceCompany>(`${this.apiServerUrl}/employeeInsuranceCompany/delete/${empInsurComId}`,empInsurComId);
  }

  public deleteContractVacation(contractId: ContractVacation): Observable<ContractVacation>{
    return this.http.put<ContractVacation>(`${this.apiServerUrl}/contractVacation/delete/${contractId}`,contractId);
  }
  public deleteContractBenefits(contractId: ContractBenefits): Observable<ContractBenefits>{
    return this.http.put<ContractBenefits>(`${this.apiServerUrl}/contractBenefits/delete/${contractId}`,contractId);
  }
  // public deleteContractSalaryObject(contractId: ContractSalaryObject): Observable<ContractSalaryObject>{
  //   return this.http.put<ContractSalaryObject>(`${this.apiServerUrl}/contractSalaryObject/delete/${contractId}`,contractId);
  // }
  

  public count():any{
    return this.http.get(`${this.apiServerUrl}/employee/countdata`)
  }

  public max():any{
    return this.http.get(`${this.apiServerUrl}/contract/max`)
  }
  
  

}

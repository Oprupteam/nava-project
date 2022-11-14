import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InsuranceCompanyService } from '../insurance-company.service';

@Component({
  selector: 'app-add-insuranceCompany',
  templateUrl: './add-insurance-company.component.html',
  styleUrls: ['./add-insurance-company.component.scss']
})
export class AddInsuranceCompanyComponent implements OnInit {
  form: FormGroup = new FormGroup({

  insuranceCompanyName: new FormControl(''),
  insuranceCompanyDescription: new FormControl(''),


  });
  constructor(
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private insuranceCompanyService:InsuranceCompanyService,
    private translate:TranslateService,
    private router: Router
    ) { }

  insuranceCompanyData = {
    insuranceCompanyName: '',
    insuranceCompanyDescription: '',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

       
        insuranceCompanyName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        insuranceCompanyDescription: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],



      }

    )
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addInsuranceCompany(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.insuranceCompanyService.addInsuranceCompany(this.insuranceCompanyData).subscribe(
      () => {this.router.navigate(['insurance-company/view'])}
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InsuranceCompanyService } from '../insurance-company.service';

@Component({
  selector: 'app-update-insuranceCompany',
  templateUrl: './update-insurance-company.component.html',
  styleUrls: ['./update-insurance-company.component.scss']
})
export class UpdateInsuranceCompanyComponent implements OnInit {
  insuranceCompanyId=this.activateRoute.snapshot.params['id'];
  insuranceCompany:any;

  form: FormGroup = new FormGroup({

    insuranceCompanyName: new FormControl(''),
    insuranceCompanyDescription: new FormControl(''),

    });
    
  constructor(
    public fb: FormBuilder,
    private insuranceCompanyService: InsuranceCompanyService,
    private activateRoute:ActivatedRoute,
    private translat :TranslateService,
    private router: Router
    ) { }

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
    this.getInsuranceCompanyById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getInsuranceCompanyById=()=>{
   this.insuranceCompanyService.getInsuranceCompanyById(this.insuranceCompanyId).subscribe(data=>{
    this.insuranceCompany=data
    
   })
  }

  insuranceCompanyUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.insuranceCompanyService.updateInsuranceCompany(this.insuranceCompany).subscribe(
      () => {this.router.navigate(['insurance-company/view'])}
    )
  }
}

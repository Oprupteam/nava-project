import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BenefitService } from '../benefit.service';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.scss']
})
export class AddBenefitComponent implements OnInit {
  form: FormGroup = new FormGroup({
    benefitType: new FormControl(''),
    benefitDescription: new FormControl(''),

  });


  constructor(
  public fb: FormBuilder, // Form Builder service for Reactive forms
  private benefitService:BenefitService,
  private translate:TranslateService,
  private router: Router) 
  { }

  benefitData = {
    benefitsType: '',
    benefitsDescription:'',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        benefitType: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        benefitDescription: [null, Validators.compose([
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

  public addBenefit(): void{
    console.log(this.benefitData)
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.benefitService.addBenefit(this.benefitData).subscribe(
      () => {this.router.navigate(['benefit/view'])}

    )
  }

}





import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BenefitService } from '../benefit.service';

@Component({
  selector: 'app-update-benefit',
  templateUrl: './update-benefit.component.html',
  styleUrls: ['./update-benefit.component.scss']
})
export class UpdateBenefitComponent implements OnInit {
  benefitId=this.activateRoute.snapshot.params['id'];
  benefit:any;

  form: FormGroup = new FormGroup({

    benefitType: new FormControl(''),
    benefitDescription: new FormControl(''),

    });
    
  constructor(
    public fb: FormBuilder,
    private benefitService: BenefitService,
    private activateRoute:ActivatedRoute,
    private translat :TranslateService,
    private router: Router
    ) { }

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
    this.getBenefitById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getBenefitById=()=>{
   this.benefitService.getBenefitById(this.benefitId).subscribe(data=>{
    this.benefit=data
    
   })
  }

  benefitUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.benefitService.updateBenefit(this.benefit).subscribe(
      () => {this.router.navigate(['benefit/view'])}
    )
  }
}

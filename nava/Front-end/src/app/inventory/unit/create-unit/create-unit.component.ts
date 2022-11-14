import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { UnitService } from '../Unit.service';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreateUnitComponent implements OnInit {

  UnitData = {
    unitId:'',
    unitName:'',
    description: '',
    deleteFlag: 1
  }

  form: FormGroup = new FormGroup({
    unitName:new FormControl(''),
  });


  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private UnitService: UnitService,
    public fb: FormBuilder,
    private router: Router,
  )    {

   // Language code
   this.translate.setDefaultLang('ar');
   const lang = localStorage.getItem('lang') || 'ar';
   this.translate.use(lang);
   document.documentElement.lang = lang;

   }


  ngOnInit(): void {
    this.form = this.fb.group(
      {
        unitName: [null, Validators.compose([
        Validators.required,
        //  Validators.pattern('^([a-zA-Z\s]+)$')
        ])],

      }

    )
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addUnit(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.UnitService.addUnit(this.UnitData).subscribe(
      () => {this.router.navigate(['/unit/unit'])}
    )
  }

}



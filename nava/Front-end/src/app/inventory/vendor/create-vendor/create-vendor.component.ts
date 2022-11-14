import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { VendorService } from '../Vendor.service';
import countries  from '../../../files/countries.json';
import countriesEn from '../../../files/countriesEn.json';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.scss'],
  providers: [CountryService, DecimalPipe],

})
export class CreateVendorComponent implements OnInit {

  countryList:{name:String,code:String}[]=countries;
  countryListEn:{name:String,code:String}[]=countriesEn;

  vendorData = {
    vendorId:'',
  vendorAccountantNumber:'',
  //vendorCode: '',
  vendorName: '',
  country: '',
  contactPerson: '',
  contactNumber:'',
  details: '',
    deleteFlag: 1
  }


  form: FormGroup = new FormGroup({

   vendorAccountantNumber:new FormControl(''),
  vendorCode: new FormControl(''),
  vendorName: new FormControl(''),
  contactPerson: new FormControl(''),
  contactNumber:new FormControl(''),
  country:new FormControl(''),
  });



  constructor(
    public service: CountryService,
    // Language code
    public translate: TranslateService,
    private router: Router,
    private vendorService: VendorService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
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

        vendorAccountantNumber:[null, Validators.compose([
          Validators.required,
           Validators.pattern('^([0-9]+)$')
        ])],
        // vendorCode: [null, Validators.compose([
        //   Validators.required,
        //    Validators.pattern('^([0-9]+)$')
        // ])],
        vendorName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        contactPerson: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([0-9]+)$')
        ])],
        contactNumber:[null, Validators.compose([
          Validators.required,
          Validators.pattern('^([0-9]+)$')
        ])],
        country: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],



      }

    )

  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addVendor(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.vendorService.addVendor(this.vendorData).subscribe(
      () => {this.router.navigate(['/vendor/vendor'])}
    )
  }

}


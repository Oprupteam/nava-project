import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../Vendor.service';
import countries  from '../../../files/countries.json';
import countriesEn from '../../../files/countriesEn.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.scss']
})
export class UpdateVendorComponent implements OnInit {

  countryList:{name:String,code:String}[]=countries;
  countryListEn:{name:String,code:String}[]=countriesEn;

  vendorId=this.activateRoute.snapshot.params['id'];
  vendor:any;
  form: FormGroup = new FormGroup({

    vendorAccountantNumber:new FormControl(''),
  //vendorCode: new FormControl(''),
  vendorName: new FormControl(''),
  contactPerson: new FormControl(''),
  contactNumber:new FormControl(''),
  country:new FormControl(''),
  });

  constructor(
    private vendorService: VendorService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private activateRoute:ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    ) {
// Language code
this.translate.setDefaultLang('ar');
const lang = localStorage.getItem('lang') || 'ar';
this.translate.use(lang);
document.documentElement.lang = lang;

    }

  ngOnInit(): void {
    this.getvendorById()
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
  getvendorById=()=>{
   this.vendorService.getVendorById(this.vendorId).subscribe(data=>{
    this.vendor=data

   })
  }

  vendorUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.vendorService.updateVendor(this.vendor).subscribe(
      () => {this.router.navigate(['/vendor/vendor'])}
    )
  }
}


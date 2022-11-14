import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { StoreService } from '../Store.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class CreateStoreComponent implements OnInit {

  StorData = {
    storeId: '',
    stroeCode: '',
    storePlace: '',
    storeContact: '',
    storeKeeper: '',
    deleteFlag: 1
  }

  form: FormGroup = new FormGroup({
    stroeCode:new FormControl(''),
    storePlace:new FormControl(''),
    storeContact: new FormControl(''),
    storeKeeper: new FormControl(''),

  });

  constructor(
     private storeService: StoreService,
    private router: Router,
    public fb: FormBuilder,) { }


  ngOnInit(): void {
    this.form = this.fb.group(
      {
        stroeCode:[null, Validators.compose([
          Validators.required,
           Validators.pattern('^([0-9]+)$')
        ])],
        storePlace: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        storeKeeper: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        storeContact: [null, Validators.compose([
          Validators.required,
          Validators.pattern('^([0-9]+)$')
        ])],
      }

    )
  }


  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  public addStore(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.storeService.addStore(this.StorData).subscribe(
      () => {this.router.navigate(['/store/store'])}
    )
  }

}


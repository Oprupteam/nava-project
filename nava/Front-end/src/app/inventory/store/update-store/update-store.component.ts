import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { StoreService } from '../Store.service';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class UpdateStoreComponent implements OnInit {

  storeId=this.activateRoute.snapshot.params['id'];
  store:any;
  form: FormGroup = new FormGroup({
    stroeCode:new FormControl(''),
    storePlace:new FormControl(''),
    storeContact: new FormControl(''),
    storeKeeper: new FormControl(''),

  });

  constructor(
    private storeService: StoreService,
    public fb: FormBuilder,
    private router: Router,
    private activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getstoreById();
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

  getstoreById=()=>{
   this.storeService.getStoreById(this.storeId).subscribe(data=>{
    this.store=data

   })
  }


  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  storeUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.storeService.updateStore(this.store).subscribe(
      () => {this.router.navigate(['/store/store'])}
    )
  }
}

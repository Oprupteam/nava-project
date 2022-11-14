import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-update-bank',
  templateUrl: './update-bank.component.html',
  styleUrls: ['./update-bank.component.scss']
})
export class UpdateBankComponent implements OnInit {
  bankId=this.activateRoute.snapshot.params['id'];
  bank:any;

  form: FormGroup = new FormGroup({

  bankName: new FormControl(''),
  bankDescription: new FormControl(''),

  
  });
  constructor(
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private bankService: BankService,
    private activateRoute:ActivatedRoute,
    private translate:TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        bankName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        bankDescription: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
      }
    )
    this.getBankById()
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getBankById=()=>{
   this.bankService.getBankById(this.bankId).subscribe(data=>{
    this.bank=data
    
   })
  }

  bankUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.bankService.updateBank(this.bank).subscribe(
      () => {this.router.navigate(['bank/view'])}
      )
  }
}

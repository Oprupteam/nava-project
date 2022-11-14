import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { FinanceService } from '../../finance.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  form: FormGroup = new FormGroup({
    parentAccount:new FormControl(''),
    accountName: new FormControl(''),
    accountType: new FormControl(''),
    accountCode: new FormControl(''),

});
coaData = {
  accountId: '',
  parentAccount: '',
  accountName:  '',
  accountType:'',
  accountCode:'',
  accountDescription:'',
  deleteFlag: 1,
  accountValue: 0,
  transDebit: 0,
  transCredit: 0,
  finalBalance: 0
};

  accounts:any[]=[]
  codes:any[]=[]


  constructor(
    public fb: FormBuilder,

    private financeService: FinanceService, private router: Router, private translate: TranslateService) { this.translate.setDefaultLang('ar');
  const lang = localStorage.getItem('lang')  || 'ar';
  this.translate.use(lang);
  document.documentElement.lang = lang; }

  ngOnInit(): void {
    this.getAllAccounts()
    this.form = this.fb.group(
      {
        parentAccount:['', Validators.required],
        accountName:['',Validators.required],
        accountType: ['',Validators.required],
        accountCode: ['',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],

   })}
   submitted = false;
   get f(): { [key: string]: AbstractControl } {
     return this.form.controls;
   }
   goAccountList(){
     this.router.navigate(['/ChartAccount/ChartAccount'])
   }
   getAllAccounts(){
    this.financeService.getCoa().subscribe((data)=>{


      const filtered=data.filter((element)=>{
        return element.accountType=='main'
      })
      for (let i = 1; i <=8; i++) {
        filtered.forEach(element => {
          if(element.accountCode.toString()[0] ==i)
          this.accounts.push(element)
        });

      }
    })
   }
   GenerateAccountCode(event:any){
    var parId= (event.target as HTMLInputElement).value;
   // alert((parId))
   // alert(event)
    this.financeService.getAccountsByParent(parId).subscribe((data:any)=>{
    if(data.length == 0){
       this.coaData.accountCode=parId+'0'
      // console.log(parId);
      }
    else{
     // console.log(data);

      let max=0;
      data.forEach(element=>{
        Number(element.accountCode)>max?max=Number(element.accountCode):''
      })
      this.coaData.accountCode=(max+1).toString()
    }
    })
   // console.log(this.coaData.accountCode);

   }
   public onAddAccounts(): void {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.codes.includes(this.coaData.accountCode)){
      Swal.fire(this.translate.instant('Error'), this.translate.instant('accountcodeisexist,trytochangeit!'), 'error')
      return
    }

     this.financeService.addAcount(this.coaData).subscribe(
       (response) => {

         console.log(response);
         Swal.fire(this.translate.instant('success'), this.translate.instant('Dataisadded'), 'success')
         this.financeService.getCoa();
         this.goAccountList();
       },
       (error: HttpErrorResponse) => {
        console.log(this.coaData);

         alert(error.message);
         Swal.fire(this.translate.instant('Error'), this.translate.instant('ErrorwhileaddingData'),
         'error')
         }
     );
      }

}

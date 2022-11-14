import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-add-management',
  templateUrl: './add-management.component.html',
  styleUrls: ['./add-management.component.scss']
})
export class AddManagementComponent implements OnInit {
  
  form: FormGroup = new FormGroup({

    managementName:new FormControl(''),
    topManagement:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),

  });

  
  constructor(
    private managementService:ManagementService,
    private translate:TranslateService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private router: Router

    ) { }

  managementData = {
    managementName: '',
    topManagement: '',
    startDate: 1/1/2022,
    endDate: 1/1/2022,
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        managementName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        topManagement: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        startDate: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        endDate: [null, Validators.compose([
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

  public addManagement(): void{
    
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.managementService.addManagement(this.managementData).subscribe(
      () => {this.router.navigate(['management/view'])}
    )
    console.log(this.managementData)

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-update-management',
  templateUrl: './update-management.component.html',
  styleUrls: ['./update-management.component.scss']
})
export class UpdateManagementComponent implements OnInit {
  managementId=this.activateRoute.snapshot.params['id'];
  management:any;

  form: FormGroup = new FormGroup({

    managementName:new FormControl(''),
    topManagement:new FormControl(''),
    startDate:new FormControl(''),
    endDate:new FormControl(''),

  
  });
  constructor(
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private managementService: ManagementService,
    private activateRoute:ActivatedRoute,
    private translate:TranslateService,
    private router: Router

    ) { }

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
    this.getManagementById()
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getManagementById=()=>{
   this.managementService.getManagementById(this.managementId).subscribe(data=>{
    this.management=data
    
   })
  }

  managementUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.managementService.updateManagement(this.management).subscribe(
      () => {this.router.navigate(['management/view'])}
      )
  }
}

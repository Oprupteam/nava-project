import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeTypeService } from '../employee-type.service';

@Component({
  selector: 'app-update-employeeType',
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.scss']
})
export class UpdateEmployeeTypeComponent implements OnInit {
  employeeTypeId=this.activateRoute.snapshot.params['id'];
  employeeType:any;

  form: FormGroup = new FormGroup({

  employeeTypeName: new FormControl(''),
  employeeTypeDescription: new FormControl(''),


  });
  constructor(
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private employeeTypeService: EmployeeTypeService,
    private activateRoute:ActivatedRoute,
    private translate:TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {


        employeeTypeName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        employeeTypeDescription: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],




      }

    )
    this.getEmployeeTypeById()
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getEmployeeTypeById=()=>{
   this.employeeTypeService.getEmployeeTypeById(this.employeeTypeId).subscribe(data=>{
    this.employeeType=data

   })
  }

  employeeTypeUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.employeeTypeService.updateEmployeeType(this.employeeType).subscribe(
      () => {this.router.navigate(['employee-type/view'])}
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeTypeService } from '../employee-type.service';

@Component({
  selector: 'app-add-employeeType',
  templateUrl: './add-employee-type.component.html',
  styleUrls: ['./add-employee-type.component.scss']
})
export class AddEmployeeTypeComponent implements OnInit {

  form: FormGroup = new FormGroup({

    employeeTypeName:new FormControl(''),
    employeeTypeDescription:new FormControl(''),

  });


  constructor(
    private employeeTypeService:EmployeeTypeService,
    private translate:TranslateService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private router: Router
    ) { }

  employeeTypeData = {
    employeeTypeName: '',
    employeeTypeDescription: '',
    deleteFlag: 1
  }

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
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addEmployeeType(): void{

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.employeeTypeService.addEmployeeType(this.employeeTypeData).subscribe(
      () => {this.router.navigate(['employee-type/view'])}
    )
   // console.log(this.employeeTypeData)


  }

}

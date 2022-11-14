import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  form: FormGroup = new FormGroup({
    departmentName: new FormControl(''),
    depManagers: new FormControl(''),

  });

  depManagers:any;

  constructor(
  public fb: FormBuilder, // Form Builder service for Reactive forms
  private departmentService:DepartmentService,
  private translate:TranslateService,
  private router: Router) 
  { }

  departmentData = {
    departmentName: '',
    deleteFlag: 1,
    employee:{
      employeeId:''
    }
  }

  ngOnInit(): void {
    this.getAllDepManagers()
    this.form = this.fb.group(
      {
        departmentName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        depManagers: [null, Validators.compose([
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

  public addDepartment(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.departmentService.addDepartment(this.departmentData).subscribe(
      () => {this.router.navigate(['department/view'])}
    )
  }

  getAllDepManagers(){
    this.departmentService.getAllDepManagers().subscribe(data => this.depManagers = data)
    console.log(this.depManagers)
  }

}





import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SalaryObjectService } from '../salary-object.service';


@Component({
  selector: 'app-add-salaryObject',
  templateUrl: './add-salary-Object.component.html',
  styleUrls: ['./add-salary-Object.component.scss']
})
export class AddSalaryObjectComponent implements OnInit {
  form: FormGroup = new FormGroup({

    salaryObjectName:new FormControl(''),
    salaryObjectDescription:new FormControl(''),

  });

  constructor(private translate: TranslateService,
    private salaryObjectService:SalaryObjectService, 
    public fb: FormBuilder,
    private router: Router
    ) { }

  salaryObjectData = {
    salaryObjectName: '',
    salaryObjectDescription: '',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        salaryObjectName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        salaryObjectDescription: [null, Validators.compose([
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
  public addSalaryObject(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.salaryObjectService.addSalaryObject(this.salaryObjectData).subscribe(
      () => {this.router.navigate(['salary-object/view'])}
    )
    console.log(this.salaryObjectData)

  }

}

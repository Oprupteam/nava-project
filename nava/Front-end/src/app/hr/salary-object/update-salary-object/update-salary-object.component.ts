import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SalaryObjectService } from '../salary-object.service';


@Component({
  selector: 'app-update-salaryObject',
  templateUrl: './update-salary-object.component.html',
  styleUrls: ['./update-salary-object.component.scss']
})
export class UpdateSalaryObjectComponent implements OnInit {
  salaryObjectId=this.activateRoute.snapshot.params['id'];
  salaryObject:any;
  form: FormGroup = new FormGroup({

    salaryObjectName:new FormControl(''),
    salaryObjectDescription:new FormControl(''),

  });

  constructor(
    private translate: TranslateService,
    private salaryObjectService: SalaryObjectService,
    private activateRoute:ActivatedRoute,
    public fb: FormBuilder,
    private router: Router
    ) { }

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
    this.getSalaryObjectById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getSalaryObjectById=()=>{
   this.salaryObjectService.getSalaryObjectById(this.salaryObjectId).subscribe(data=>{
    this.salaryObject=data
    
   })
  }

  salaryObjectUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.salaryObjectService.updateSalaryObject(this.salaryObject).subscribe(
      () => {this.router.navigate(['salary-object/view'])}
    )
  }
}

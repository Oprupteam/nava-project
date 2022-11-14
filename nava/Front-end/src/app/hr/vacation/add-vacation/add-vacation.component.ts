import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VacationService } from '../vacation.service';

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.scss']
})
export class AddVacationComponent implements OnInit {
  form: FormGroup = new FormGroup({
    vacationType: new FormControl(''),
    vacationDescription: new FormControl(''),

  });


  constructor(
  public fb: FormBuilder, // Form Builder service for Reactive forms
  private vacationService:VacationService,
  private translate:TranslateService,
  private router: Router) 
  { }

  vacationData = {
    vacationType: '',
    vacationDescription:'',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        vacationType: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        vacationDescription: [null, Validators.compose([
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

  public addVacation(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.vacationService.addVacation(this.vacationData).subscribe(
      () => {this.router.navigate(['vacation/view'])}

    )
  }

}





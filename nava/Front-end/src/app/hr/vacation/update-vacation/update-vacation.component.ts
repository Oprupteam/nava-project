import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VacationService } from '../vacation.service';

@Component({
  selector: 'app-update-vacation',
  templateUrl: './update-vacation.component.html',
  styleUrls: ['./update-vacation.component.scss']
})
export class UpdateVacationComponent implements OnInit {
  vacationId=this.activateRoute.snapshot.params['id'];
  vacation:any;

  form: FormGroup = new FormGroup({

    vacationType: new FormControl(''),
    vacationDescription: new FormControl(''),

    });
    
  constructor(
    public fb: FormBuilder,
    private vacationService: VacationService,
    private activateRoute:ActivatedRoute,
    private translat :TranslateService,
    private router: Router
    ) { }

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
    this.getVacationById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getVacationById=()=>{
   this.vacationService.getVacationById(this.vacationId).subscribe(data=>{
    this.vacation=data
    
   })
  }

  vacationUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.vacationService.updateVacation(this.vacation).subscribe(
      () => {this.router.navigate(['vacation/view'])}
    )
  }
}

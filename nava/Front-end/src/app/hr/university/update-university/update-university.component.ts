import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UniversityService } from '../university.service';

@Component({
  selector: 'app-update-university',
  templateUrl: './update-university.component.html',
  styleUrls: ['./update-university.component.scss']
})
export class UpdateUniversityComponent implements OnInit {
  universityId=this.activateRoute.snapshot.params['id'];
  university:any;

  form: FormGroup = new FormGroup({

    salaryObjectName:new FormControl(''),
    country:new FormControl(''),
    universityType:new FormControl(''),

  });
  constructor(
    public fb: FormBuilder,
    private universityService: UniversityService,
    private translate: TranslateService,
    private activateRoute:ActivatedRoute,
    private router: Router

    ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        universityName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        country: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        universityType: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
       



      }

    )
    this.getUniversityById()
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getUniversityById=()=>{
   this.universityService.getUniversityById(this.universityId).subscribe(data=>{
    this.university=data
    
   })
  }

  universityUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.universityService.updateUniversity(this.university).subscribe(
      () => {this.router.navigate(['university/view'])}
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JobTitleService } from '../job-title.service';

@Component({
  selector: 'app-update-jobTitle',
  templateUrl: './update-job-title.component.html',
  styleUrls: ['./update-job-title.component.scss']
})
export class UpdateJobTitleComponent implements OnInit {
  jobTitleId=this.activateRoute.snapshot.params['id'];
  jobTitle:any;

  form: FormGroup = new FormGroup({

    jobTitleName: new FormControl(''),
    jobTitleDescription: new FormControl(''),

    });
    
  constructor(
    public fb: FormBuilder,
    private jobTitleService: JobTitleService,
    private activateRoute:ActivatedRoute,
    private translat :TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

       
        jobTitleName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        jobTitleDescription: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],



      }

    )
    this.getJobTitleById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getJobTitleById=()=>{
   this.jobTitleService.getJobTitleById(this.jobTitleId).subscribe(data=>{
    this.jobTitle=data
    
   })
  }

  jobTitleUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.jobTitleService.updateJobTitle(this.jobTitle).subscribe(
      () => {this.router.navigate(['job-title/view'])}
    )
  }
}

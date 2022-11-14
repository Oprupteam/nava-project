import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JobTitleService } from '../job-title.service';

@Component({
  selector: 'app-add-jobTitle',
  templateUrl: './add-job-title.component.html',
  styleUrls: ['./add-job-title.component.scss']
})
export class AddJobTitleComponent implements OnInit {
  form: FormGroup = new FormGroup({

  jobTitleName: new FormControl(''),


  });
  constructor(
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private jobTitleService:JobTitleService,
    private translate:TranslateService,
    private router:Router) { }

  jobTitleData = {
    jobTitleName: '',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

       
        jobTitleName: [null, Validators.compose([
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

  public addJobTitle(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.jobTitleService.addJobTitle(this.jobTitleData).subscribe(
      () => {this.router.navigate(['job-title/view'])}
    )
  }

}

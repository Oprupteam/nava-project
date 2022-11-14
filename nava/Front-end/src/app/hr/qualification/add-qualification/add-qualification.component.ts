import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QualificationService } from '../qualification.service';


@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {
  form: FormGroup = new FormGroup({

    qualificationName:new FormControl(''),
    qualificationDescription:new FormControl(''),

  });
 

  constructor(private qualificationService:QualificationService,
    private translat :TranslateService,
    public fb: FormBuilder,
    private router: Router
    ) { }

  qualificationData = {
    qualificationName: '',
    qualificationDescription: '',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        qualificationName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        qualificationDescription: [null, Validators.compose([
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

  public addQualification(): void{
     
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.qualificationService.addQualification(this.qualificationData).subscribe(
      () => {this.router.navigate(['qualification/view'])}
    )
    console.log(this.qualificationData)

  }

}

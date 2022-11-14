import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QualificationService } from '../qualification.service';


@Component({
  selector: 'app-update-qualification',
  templateUrl: './update-qualification.component.html',
  styleUrls: ['./update-qualification.component.scss']
})
export class UpdateQualificationComponent implements OnInit {
  qualificationId=this.activateRoute.snapshot.params['id'];
  qualification:any;
  form: FormGroup = new FormGroup({

    qualificationName:new FormControl(''),
    qualificationDescription:new FormControl(''),

  });
 

  constructor(
    private qualificationService: QualificationService,
    private activateRoute:ActivatedRoute, 
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
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
       



      }

    )
    this.getQualificationById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getQualificationById=()=>{
   this.qualificationService.getQualificationById(this.qualificationId).subscribe(data=>{
    this.qualification=data
    
   })
  }

  
  qualificationUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.qualificationService.updateQualification(this.qualification).subscribe(
      () => {this.router.navigate(['qualification/view'])}
    )
  }
}

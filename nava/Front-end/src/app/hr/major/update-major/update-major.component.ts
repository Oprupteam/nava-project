import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MajorService } from '../major.service';

@Component({
  selector: 'app-update-major',
  templateUrl: './update-major.component.html',
  styleUrls: ['./update-major.component.scss']
})
export class UpdateMajorComponent implements OnInit {
  majorId=this.activateRoute.snapshot.params['id'];
  major:any;

  form: FormGroup = new FormGroup({

    majorName:new FormControl(''),
    majorDescription:new FormControl(''),

 
  });
  constructor(
    public fb: FormBuilder,
    private majorService: MajorService,
    private activateRoute:ActivatedRoute,
    private translate:TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {

        
        majorName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        majorDescription: [null, Validators.compose([
          Validators.nullValidator,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],



      }

    )
    this.getMajorById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getMajorById=()=>{
   this.majorService.getMajorById(this.majorId).subscribe(data=>{
    this.major=data
    
   })
  }

  majorUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.majorService.updateMajor(this.major).subscribe(
      () => {this.router.navigate(['major/view'])}
    )
  }
}

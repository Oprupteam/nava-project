import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MajorService } from '../major.service';

@Component({
  selector: 'app-add-major',
  templateUrl: './add-major.component.html',
  styleUrls: ['./add-major.component.scss']
})
export class AddMajorComponent implements OnInit {
  form: FormGroup = new FormGroup({

    majorName:new FormControl(''),
    majorDescription:new FormControl(''),

  });
  constructor(
    public fb: FormBuilder,
    private majorService:MajorService,
    private translate:TranslateService,
    private router: Router
    ) {
      
     }

  majorData = {
    majorName: '',
    majorDescription: '',
    deleteFlag: 1
  }

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
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addMajor(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.majorService.addMajor(this.majorData).subscribe(
      () => {this.router.navigate(['major/view'])}
    )
  }

}

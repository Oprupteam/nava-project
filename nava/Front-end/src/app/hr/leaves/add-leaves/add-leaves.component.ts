import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LeavesService } from '../leaves.service';

@Component({
  selector: 'app-add-leaves',
  templateUrl: './add-leaves.component.html',
  styleUrls: ['./add-leaves.component.scss']
})
export class AddLeavesComponent implements OnInit {
  form: FormGroup = new FormGroup({
    leavesType: new FormControl(''),
    leavesDescription: new FormControl(''),

  });


  constructor(
  public fb: FormBuilder, // Form Builder service for Reactive forms
  private leavesService:LeavesService,
  private translate:TranslateService,
  private router: Router) 
  { }

  leavesData = {
    leavesType: '',
    leavesDescription:'',
    deleteFlag: 1
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        leavesType: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        leavesDescription: [null, Validators.compose([
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

  public addLeaves(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.leavesService.addLeaves(this.leavesData).subscribe(
      () => {this.router.navigate(['leaves/view'])}

    )
  }

}





import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LeavesService } from '../leaves.service';

@Component({
  selector: 'app-update-leaves',
  templateUrl: './update-leaves.component.html',
  styleUrls: ['./update-leaves.component.scss']
})
export class UpdateLeavesComponent implements OnInit {
  leavesId=this.activateRoute.snapshot.params['id'];
  leaves:any;

  form: FormGroup = new FormGroup({

    leavesType: new FormControl(''),
    leavesDescription: new FormControl(''),

    });
    
  constructor(
    public fb: FormBuilder,
    private leavesService: LeavesService,
    private activateRoute:ActivatedRoute,
    private translat :TranslateService,
    private router: Router
    ) { }

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
    this.getLeavesById()
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getLeavesById=()=>{
   this.leavesService.getLeavesById(this.leavesId).subscribe(data=>{
    this.leaves=data
    
   })
  }

  leavesUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.leavesService.updateLeaves(this.leaves).subscribe(
      () => {this.router.navigate(['leaves/view'])}
    )
  }
}

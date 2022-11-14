import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../Unit.service';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.scss']
})
export class UpdateUnitComponent implements OnInit {

  unitId=this.activateRoute.snapshot.params['id'];
  unit:any;

  form: FormGroup = new FormGroup({
    unitName:new FormControl(''),
  });

  constructor(
    private unitService: UnitService,
    private activateRoute:ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getUnitById(),
    this.form = this.fb.group(
      {
        unitName: [null, Validators.compose([
        Validators.required,
        //  Validators.pattern('^([a-zA-Z\s]+)$')
        ])],

      }

    )
  }

  getUnitById=()=>{
   this.unitService.getUnitById(this.unitId).subscribe(data=>{
    this.unit=data

   })
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  unitUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.unitService.updateUnit(this.unit).subscribe(
      () => {this.router.navigate(['/unit/unit'])}
    )
  }
}


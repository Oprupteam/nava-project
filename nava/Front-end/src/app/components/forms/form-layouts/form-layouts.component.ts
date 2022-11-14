import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-form-layouts',
  templateUrl: './form-layouts.component.html',
  styleUrls: ['./form-layouts.component.scss']
})
export class FormLayoutsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  
  placement = 'bottom';
  calendar: any;


  constructor() { }

  ngOnInit(): void {
  }
  telInputObject(obj: any) {
    // console.log(obj);
    obj.setCountry('in');
  }
  getNumber(number: any) {
    // console.log(number);
  }
  hasError(err: any) {
    // console.log(err);
  }
  onCountryChange(country: any) {
    // console.log(country);
  }
  

}

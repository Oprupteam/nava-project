import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../section.service';
import { DepartmentService } from '../../department/department.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.scss']
})
export class UpdateSectionComponent implements OnInit {
  sectionId=this.activateRoute.snapshot.params['id'];
  section:any;
  departments:any;
  secManagers:any;

  constructor(
    private sectionService: SectionService,
    private activateRoute:ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    public fb: FormBuilder
    ) { }

    form: FormGroup = new FormGroup({
      department: new FormControl(''),
      section: new FormControl(''),
      secManager: new FormControl(''),
      });
    

  ngOnInit(): void {

    this.form = this.fb.group(
      {        
        department: [null, Validators.compose([Validators.required])],
        section: [null, Validators.compose([Validators.required])],
        secManager: [null, Validators.compose([Validators.required])],
      }
    )

    this.getSectionById() 
    this.getAllDepartments()  
    this.getAllSecManagers()
  }



  getSectionById=()=>{
   this.sectionService.getSectionById(this.sectionId).subscribe(data=>{
    this.section=data
   })
  }


  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  sectionUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid)return

    this.sectionService.updateSection(this.section).subscribe(
      () => {this.router.navigate(['section/view'])}
    )
    console.log('Section: ',this.section)
  }

  getAllDepartments(){
    this.departmentService.getAllDepartments()
    .subscribe(data => this.departments = data)
    console.log(this.departments)
  }

  getAllSecManagers(){
    this.sectionService.getAllSecManagers()
    .subscribe(data => this.secManagers = data)
  }
}

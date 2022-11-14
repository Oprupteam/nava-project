import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category/Category';
import { CategoryService } from '../../category/category.service';
import { SubcategoryService } from '../Subcategory.service';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.scss']
})
export class UpdateSubcategoryComponent implements OnInit {

  SubcategoryId=this.activateRoute.snapshot.params['id'];
  Subcategory:any;
  category!: any;
  form: FormGroup = new FormGroup({

    subcategoryName:new FormControl(''),
    categoryId: new FormControl(''),

  });

  constructor(
    private subcategoryService: SubcategoryService,
    private activateRoute:ActivatedRoute,
    private categoryService: CategoryService,
    public fb: FormBuilder,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.getSubCategoryById();
    this.getAllCategory();
    this.form = this.fb.group(
      {
        subcategoryName:[null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
        categoryId: [null, Validators.compose([
          Validators.required,
          //  Validators.pattern('^([0-9]+)$')
        ])],
      }
    )

  }

  getSubCategoryById=()=>{
   this.subcategoryService.getSubCategoryById(this.SubcategoryId).subscribe(data=>{
    this.Subcategory=data

   })
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  subCategoryUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.Subcategory)
    this.subcategoryService.updateSubCategory(this.Subcategory).subscribe(
      () => {this.router.navigate(['/Subcategory/Subcategory'])}
    )
  }


  public getAllCategory(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.category = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}

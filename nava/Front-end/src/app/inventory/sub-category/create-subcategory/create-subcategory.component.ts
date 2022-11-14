import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Category } from '../../category/Category';
import { CategoryService } from '../../category/category.service';
import { SubcategoryService } from '../Subcategory.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class CreateSubcategoryComponent implements OnInit {

  SubCategoryData = {
    subcategoryId: '',
    subcategoryName: '',
    category: {
      categoryId:'',
    },
    description: '',
    deleteFlag: 1
  }

  form: FormGroup = new FormGroup({

    subcategoryName:new FormControl(''),
    categoryId: new FormControl(''),

  });


  category!: any;

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    public fb: FormBuilder,
    private router: Router,
  )    {

   // Language code
   this.translate.setDefaultLang('ar');
   const lang = localStorage.getItem('lang') || 'ar';
   this.translate.use(lang);
   document.documentElement.lang = lang;

   }


  ngOnInit(): void {
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
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  public addSubCategory(): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.subcategoryService.addSubCategory(this.SubCategoryData).subscribe(
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


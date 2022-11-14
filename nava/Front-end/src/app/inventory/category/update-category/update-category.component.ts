import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  categoryId=this.activateRoute.snapshot.params['id'];
  category:any;


  form: FormGroup = new FormGroup({

    categoryName:new FormControl(''),

  });

  constructor(
    private categoryService: CategoryService,
    private activateRoute:ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getCategoryById();
    this.form = this.fb.group(
      {
          categoryName: [null, Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ])],
      }

    )
  }

  getCategoryById=()=>{
   this.categoryService.getCategoriesById(this.categoryId).subscribe(data=>{
    this.category=data

   })
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  categoryUpdate=()=>{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.categoryService.updateCategories(this.category).subscribe(
      () => {this.router.navigate(['/category/category'])}
    )
  }
}

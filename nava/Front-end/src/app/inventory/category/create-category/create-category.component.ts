import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreateCategoryComponent implements OnInit {
  CategoryData = {
    categoryId: '',
    categoryName: '',
    description: '',
    deleteFlag: 1,
  };

  form: FormGroup = new FormGroup({
    categoryName: new FormControl(''),
  });

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    public fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern('^([a-zA-Z\s]+)$')
        ]),
      ],
    });
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public addCategory(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.categoryService.addCategories(this.CategoryData).subscribe(() => {
      this.router.navigate(['/category/category']);
    });
  }
}

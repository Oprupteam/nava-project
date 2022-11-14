import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Category } from '../../category/Category';
import { CategoryService } from '../../category/category.service';
import { SubCategory } from '../../sub-category/Subcategory';
import { SubcategoryService } from '../../sub-category/Subcategory.service';
import { Unit } from '../../unit/Unit';
import { UnitService } from '../../unit/Unit.service';
import { Vendor } from '../../vendor/Vendor';
import { VendorService } from '../../vendor/Vendor.service';
import { ItemsService } from '../items.service';
import countries  from '../../../files/countries.json';
import countriesEn from '../../../files/countriesEn.json';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreateItemsComponent implements OnInit {

  countryList:{name:String,code:String}[]=countries;
  countryListEn:{name:String,code:String}[]=countriesEn;
  selectAFile: File = null as any;
  filesPreview: File[] = [];
  img: any;
  year:any;

  isPrinting = true;
  elementType = 'svg';
  lineColor = '#000000';
  width = 1;
  height = 50;
  displayValue = true;
  fontOptions = '';
  format = 'CODE128';
  font = 'monospace';
  textAlign = 'right';
  textPosition = 'bottom';
  textMargin = 0;
  fontSize = 1;
  background = '#ffffff';
  margin = 1;
  marginTop = 1;
  marginBottom = 0;
  marginLeft = 0;
  marginRight = 0;



  itemsData = {
    itemsId: '',
    itemCode: '',
    itemName: '',
    itemNameEn: '',
    barCode: '',
    img: '',
    quantity: '',

    countryOfOrigin: '',
    subCategory: {
      subcategoryId:'',
    },
    category: {
      categoryId: '',
    },
    unit: {
      unitId: '',
    },
    vendor: {
      vendorId: '',
    },

    expiryDate: '',
    sellingPrice: '',
    buyingPrice: '',
    lastBuyingPrice: '',
    price: '',
    tax: '0',
    taxFree: '',

    deleteFlag: 1,
  };

  form: FormGroup = new FormGroup({
    itemCode: new FormControl(''),
    itemName: new FormControl(''),
    itemNameEn: new FormControl(''),
    barCode: new FormControl(''),
    countryOfOrigin: new FormControl(''),
    categoryId: new FormControl(''),
    unitId: new FormControl(''),
    subcategoryId: new FormControl(''),
    // expiryDate: new FormControl(''),
    sellingPrice: new FormControl(''),
    buyingPrice: new FormControl(''),
    lastBuyingPrice: new FormControl(''),
    vendorId: new FormControl(''),
    tax: new FormControl(''),
    price: new FormControl(''),
    taxFree: new FormControl(''),
    quantity: new FormControl(''),
  });

  category!: any;
  Subcategory!: any;
  unit!: any;
  vendor!: any;
  SubcategoryByCategory!: any;
  SubcategoryId!: any;
  public lang=localStorage.getItem('lang')
  // countryList:{name:String,code:String}[]=countries;
  constructor(
    public service: CountryService,
    // Language code
    public translate: TranslateService,
    public fb: FormBuilder,
    private itemsService: ItemsService,
    private unitService: UnitService,
    private SubcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private vendorService: VendorService,
    private router: Router,
    private modalService: NgbModal,

  ) {
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {

    this.getAllCategory();
    this.getAllSubcategory();
    this.getAllUnit();
    this.getAllVendor();
    this.count();
    this.form = this.fb.group({
      itemCode: [null, Validators.compose([Validators.required])],
      itemName: [null, Validators.compose([Validators.required])],
      itemNameEn: [null, Validators.compose([Validators.required])],
       barCode: [null, Validators.compose([Validators.nullValidator])],
      countryOfOrigin: [null, Validators.compose([Validators.required])],
      categoryId: [null, Validators.compose([Validators.required])],
      unitId: [null, Validators.compose([Validators.required])],
      subcategoryId: [null, Validators.compose([Validators.required])],
      // expiryDate: [null, Validators.compose([Validators.nullValidator])],
      sellingPrice: [null, Validators.compose([Validators.nullValidator])],
      buyingPrice: [null, Validators.compose([Validators.nullValidator])],
      lastBuyingPrice: [null, Validators.compose([Validators.nullValidator])],
      vendorId: [null, Validators.compose([Validators.required])],
      tax: [null, Validators.compose([Validators.nullValidator])],
      price: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.nullValidator])],
      taxFree: [null, Validators.compose([Validators.nullValidator])],
    });
  }

  // Select2Open(select2modal:any) {

  //   this.modalService.open(select2modal);

  // }
  itemCode!:any
  getitemCode(event:any){
  this.itemCode=event.target.value
  }

  public barcodeAutoGenerate(): void{
    this.itemsData.barCode=this.itemsData.itemCode+'.'+this.itemsData.itemNameEn
  }


  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // upload img
  onPreviewFileSelect(event:any) {
    // console.log(event.addedFiles[0].name)
    if(this.filesPreview.length<1)
      {
      // console.log(event);
		  this.filesPreview.push(...event.addedFiles);
      this.img = event.addedFiles
      this.itemsData.img = event.addedFiles[0].name
      }
	}
  onPreviewFileRemove(event:any) {
		// console.log(event);
		this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
	}

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

// $event.target.files
  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    this.itemsService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    // console.log(httpEvent)
    switch(httpEvent.type) {
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          // console.log(httpEvent);
          break;

    }
  }
// upload img

  Select2Open(select2modal:any) {

    this.modalService.open(select2modal);

  }

  public addItems(): void {
    // this.itemsData.expiryDate =
    // this.convertDate(this.itemsData.expiryDate)
    console.log(this.itemsData);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.onUploadFiles(this.img)

    this.itemsService.addItems(this.itemsData).subscribe(() => {
      console.log(this.itemsData);
      this.router.navigate(['/items/items']);
    }),
      (error: HttpErrorResponse) => {

      };

  }

  public getAllCategory(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.category = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getAllSubcategory(): void {
    this.SubcategoryService.getSubCategories().subscribe(
      (response: SubCategory[]) => {
        this.Subcategory = response;
        console.log('sub', response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  public getAllUnit(): void {
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {
        this.unit = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getAllVendor(): void {
    this.vendorService.getAllVendor().subscribe(
      (response: Vendor[]) => {
        this.vendor = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getSubCategoryByCategory = (event: any) => {
    this.SubcategoryByCategory = this.Subcategory.filter((element: any) => {
      return element.category.categoryId == event && element.deleteFlag != 0;
    });
  };

  isValue=true
  getCheckBox(event:any){
    if(event.target.value==2){
      this.isValue=false
    }else{
      this.isValue=true
    }

  }

  public convertDate(date:any){
    return `${date.year}-${date.month}-${date.day}`
  }

  count(){
    this.itemsService.count().subscribe((data: number)=>{
      this.itemsData.itemCode=`Item-${data+1}`
    })
  }


}

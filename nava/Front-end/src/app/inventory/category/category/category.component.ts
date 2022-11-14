import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import {NgbdSortableHeader,SortEvent,} from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import { Category } from '../Category';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['categoryName', 'description', 'action'];

  category!: MatTableDataSource<Category>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  searchText:any;
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  // category!: any;

  @ViewChild('categoryPrint') categoryElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  data: any;

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    delete (ws['C1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private categoryService: CategoryService,
    private toaster:ToastrService
  ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  onSort({ column, direction }: SortEvent | any) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  public getAllCategory(): void {
    this.categoryService.getCategories
    ().subscribe(
      (response: Category[]) => {
        this.category = new MatTableDataSource(response);
        this.category.paginator =this.paginator;
        this.category.sort = this.matSort;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteCategory(categoryId: Category){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){
        this.categoryService.deleteCategories(categoryId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')
        this.toaster.success(this.translate.instant('success'))
            this.getAllCategory();
            //location.reload();
          },
          (error) => {
            Swal.fire(this.translate.instant('error'), this.translate.instant('errorwhiledeletingData'), 'error')
        this.toaster.error(this.translate.instant('error'))
          }
        );
      }
    })
  }


printPage() {

    window.print();
  }

  public generatePDF(): void {
    html2canvas(this.categoryElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.categoryElement.nativeElement.innerHTML)
      PDF.save(`category.pdf`);
    });
  }

  filterData($event: any){
    this.category.filter = $event.target.value;
  }

}

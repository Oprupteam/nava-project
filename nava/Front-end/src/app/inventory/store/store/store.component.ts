import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { Store } from '../Store';
import { StoreService } from '../Store.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class StoreComponent implements OnInit {

  displayedColumns: string[] = ['stroeCode','storePlace','storeContact','storeKeeper','action'];

  store!: MatTableDataSource<Store>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  countries$: Observable<Country[]>;
  total$: Observable<number>;
  // store!: any;
  searchText:any;
  @ViewChild('storeprint') storeElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';


  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);

    delete (ws['E1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private storeService: StoreService,
    private toaster:ToastrService
    ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang')  || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {
    this.getAllStore()
   }

   public getAllStore(): void {

    this.storeService.getStores().subscribe((response:Store[]) => {
      this.store = new MatTableDataSource(response);
      this.store.paginator =this.paginator;
      this.store.sort = this.matSort;
      console.log(response);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
        }


  public deleteStore(StoreId: Store){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
     showCancelButton: true,
 cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){

        this.storeService.deleteStore(StoreId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')

        this.toaster.success(this.translate.instant('success'))
        this.getAllStore();
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

  html2canvas(this.storeElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
    const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
    const fileWidth = 210;
    const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;

    let PDF = new jsPDF('p', 'mm', 'a4',);
    PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
     PDF.html(this.storeElement.nativeElement.innerHTML)
    PDF.save(`store.pdf`);
  });


}}

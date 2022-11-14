import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import {
  NgbdSortableHeader,
  SortEvent,
} from 'src/app/shared/directives/soratable.directive';
import { Items } from '../Items';
import { ItemsService } from '../items.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['ItemPicture', 'itemCode', 'countryOfOrigin','categoryName','unitName','subcategoryName','vendorName','barCode','action'];

  items!: MatTableDataSource<Items>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;



  searchText:any;
  year:any;
  isPrinting = true;
  elementType = 'svg';
  lineColor = '#000000';
  width = 1;
  height =30;
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
  apiServerUrl = environment.apiBaseUrl;






  // items!: any;
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChild('itemsprint') itemsElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';


  data: any;

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.TABLE.nativeElement
    );

    delete ws['I1'];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private itemsService: ItemsService,
    public service: CountryService,
    private router: Router,
    private translate: TranslateService,
    private toaster:ToastrService
  ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  onSort({ column, direction }: SortEvent | any) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  public getAllItems(): void {
    this.itemsService.getAllItems().subscribe(
      (response: Items[]) => {
        this.items = new MatTableDataSource(response);
        this.items.paginator =this.paginator;
        this.items.sort = this.matSort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }







  public deleteItem(itemId: Items){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
           showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){

        this.itemsService.deleteItems(itemId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')

        this.toaster.success(this.translate.instant('success'))
        this.getAllItems();
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
    html2canvas(this.itemsElement.nativeElement, {
      scale: 2,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;

      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(
        imageGeneratedFromTemplate,
        'PNG',
        0,
        5,
        fileWidth,
        generatedImageHeight
      );
      PDF.html(this.itemsElement.nativeElement.innerHTML);
      PDF.save(`Item.pdf`);
    });
  }
}

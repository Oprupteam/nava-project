import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import { PurchaseInvoices } from '../PurchaseInvoices';
import * as XLSX from 'xlsx';
import { PurchaseInvoicesService } from '../purchaseInvoices.service';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-purchase-invoices',
  templateUrl: './purchase-invoices.component.html',
  styleUrls: ['./purchase-invoices.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class PurchaseInvoicesComponent implements OnInit {

  displayedColumns: string[] = ['invoicesNumber','invoicesDate','vendorNumber','purchaseInvoicesType','action'];

  purchaseInvoices!: MatTableDataSource<PurchaseInvoices>;
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
  marginTop = 9;
  marginBottom = 0;
  marginLeft = 0;
  marginRight = 0;


  countries$: Observable<Country[]>;
  total$: Observable<number>;
  @ViewChild('purchaseInvoicesPrint') purchaseInvoicesElement!: ElementRef;
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
    private purchaseInvoicesService:PurchaseInvoicesService,
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
      header.direction = '';}});
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }


  ngOnInit(): void {
    this.getAllPurchaseInvoices();
  }

  public getAllPurchaseInvoices(): void {
    this.purchaseInvoicesService.getAllPurchaseInvoices().subscribe(
      (response) => {
        this.purchaseInvoices = new MatTableDataSource(response);
        this.purchaseInvoices.paginator =this.paginator;
        this.purchaseInvoices.sort = this.matSort;
      }
    );
  }


  public deletePurchaseInvoices(purchaseInvoicesId:PurchaseInvoices){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){
        this.purchaseInvoicesService.deletePurchaseInvoices(purchaseInvoicesId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')
        this.toaster.success(this.translate.instant('success'))
        this.getAllPurchaseInvoices();
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

    html2canvas(this.purchaseInvoicesElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.purchaseInvoicesElement.nativeElement.innerHTML);
      PDF.save(`purchaseInvoices.pdf`);
    });
  }




  filterData(event: any){

 this.purchaseInvoices.filter = event.target.value;

}
}


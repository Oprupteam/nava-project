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
import { LocalPurchaseOrder } from '../LocalPurchaceOrder';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { LocalPurchaceOrderService } from '../localPurchaceOrder.service';

@Component({
  selector: 'app-local-purchace-order',
  templateUrl: './local-purchace-order.component.html',
  styleUrls: ['./local-purchace-order.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class LocalPurchaceOrderComponent implements OnInit {

  displayedColumns: string[] = ['localPurchaceOrderNumber','localPurchaceOrderType', 'localPurchaceOrderDate','action'];

  localPurchaceOrder!: MatTableDataSource<LocalPurchaseOrder>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  searchText:any;
  countries$: Observable<Country[]>;
  total$: Observable<number>;


  @ViewChild('localPurchaceOrdersPrint') localPurchaceOrderElement!: ElementRef;
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
    XLSX.writeFile(wb,'ScoreSheet.xlsx');
  }


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private localPurchaceOrderService: LocalPurchaceOrderService,
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
    this.getAllLocalPurchaceOrder();
  }

  public getAllLocalPurchaceOrder(): void {
    this.localPurchaceOrderService.getAllLocalPurchaceOrder
    ().subscribe(
      (response: LocalPurchaseOrder[]) => {
        this.localPurchaceOrder = new MatTableDataSource(response);
        this.localPurchaceOrder.paginator =this.paginator;
        this.localPurchaceOrder.sort = this.matSort;
        console.log("LocalPurchaseOrder: ",response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteLocalPurchaceOrder(localPurchaceOrderId: LocalPurchaseOrder){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){
        this.localPurchaceOrderService.deleteLocalPurchaceOrder(localPurchaceOrderId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')
        this.toaster.success(this.translate.instant('success'))
            this.getAllLocalPurchaceOrder();
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
    html2canvas(this.localPurchaceOrderElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.localPurchaceOrderElement.nativeElement.innerHTML)
      PDF.save(`LocalPurchaceOrder.pdf`);
    });
  }

  filterData($event: any){
    this.localPurchaceOrder.filter = $event.target.value;
  }

}

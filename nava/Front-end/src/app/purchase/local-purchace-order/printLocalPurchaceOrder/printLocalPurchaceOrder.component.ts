import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { ItemsService } from 'src/app/inventory/items/items.service';
import { VendorService } from 'src/app/inventory/vendor/Vendor.service';
import { NgbdSortableHeader } from 'src/app/shared/directives/soratable.directive';
import { ItemRequestService } from '../../item-request/item-request.service';
import { LocalPurchaceOrderService } from '../localPurchaceOrder.service';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-printLocalPurchaceOrder',
  templateUrl: './printLocalPurchaceOrder.component.html',
  styleUrls: ['./printLocalPurchaceOrder.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class PrintLocalPurchaceOrderComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  searchText:any;



  @ViewChild('localPurchaceOrdersPrint') localPurchaceOrderElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  data: any;

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    delete (ws['K1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb,'ScoreSheet.xlsx');
  }


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;



  allItems: any;
  vendor: any;
  itemsDetailsById!: any;
  itemsDetailsBy!: any;


  year: any;
  itemsDetails: any;
  itemRequest: any;
  isPrinting = true;
  elementType = 'svg';
  lineColor = '#000000';
  width = 1;
  height = 30;
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
  items: any;
  LocalPurchaceOrderId=this.activateRoute.snapshot.params['id'];

  constructor(
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private router: Router,
    private vendorService: VendorService,
    private modalService: NgbModal,
    private itemRequestService: ItemRequestService,
    private localPurchaceOrderService: LocalPurchaceOrderService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
    private itemsService: ItemsService,
    private toaster: ToastrService,
    private activateRoute:ActivatedRoute,
    private matdialog: MatDialog
  ) {

    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;

  }

  public getAllLocalPurchaceOrderDetailsByLocalPurchaceOrderId(): void {
    this.localPurchaceOrderService.getLocalPurchaceOrderDetailsByLocalPurchaceOrderId(this.LocalPurchaceOrderId).subscribe(
      (response: any) => {
        this.itemsDetailsById = response;
        console.log("this.itemsDetailsById",this.itemsDetailsById)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  ngOnInit() {
this.getAllLocalPurchaceOrderDetailsByLocalPurchaceOrderId();
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
    this.itemsDetailsById.filter = $event.target.value;
  }


}

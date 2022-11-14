import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { LocalPurchaceOrderService } from '../../local-purchace-order/localPurchaceOrder.service';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { DecimalPipe } from '@angular/common';
import { PurchaseInvoicesService } from '../purchaseInvoices.service';

@Component({
  selector: 'app-print-purchase-invoices',
  templateUrl: './print-purchase-invoices.component.html',
  styleUrls: ['./print-purchase-invoices.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class PrintPurchaseInvoicesComponent implements OnInit {
  purchaseInvoicesId=this.activateRoute.snapshot.params['id'];

  searchText:any;
  @ViewChild('purchaseInvoicesPrint') PurchaseInvoicesElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  data: any;

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    // delete (ws['K1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb,'ScoreSheet.xlsx');
  }


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;




  PurchaseInvoicesDetailsById: any;
  PurchaseInvoicesItemById: any;


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
    private purchaseInvoicesService: PurchaseInvoicesService,

    private toaster: ToastrService,
    private activateRoute:ActivatedRoute,
  ) {

    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;

  }

  public getPurchaseInvoicesDetailsByPurchaseInvoicesId(): void {
    this.purchaseInvoicesService.getPurchaseInvoicesDetailsByPurchaseInvoicesId(this.purchaseInvoicesId).subscribe(
      (response: any) => {
        if(Object.keys(response).length != 0){
          this.PurchaseInvoicesDetailsById = response;}
          else{
            this.PurchaseInvoicesDetailsById = '';
          }
        console.log("this.itemsDetailsById",this.PurchaseInvoicesDetailsById)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getPurchaseInvoicesDetailsByPurchaseInvoices(): void {
    this.purchaseInvoicesService.getPurchaseInvoicesDetailsByPurchaseInvoices(this.purchaseInvoicesId).subscribe(
      (response: any) => {
        if(Object.keys(response).length != 0){
          this.PurchaseInvoicesItemById = response;}
          else{
            this.PurchaseInvoicesItemById = '';
          }
        console.log("this.PurchaseInvoicesItemById",this.PurchaseInvoicesItemById)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  ngOnInit() {
this.getPurchaseInvoicesDetailsByPurchaseInvoicesId();
this.getPurchaseInvoicesDetailsByPurchaseInvoices();
  }

  printPage() {

    window.print();
  }

  public generatePDF(): void {
    html2canvas(this.PurchaseInvoicesElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.PurchaseInvoicesElement.nativeElement.innerHTML)
      PDF.save(`PurchaseInvoices.pdf`);
    });
  }


}

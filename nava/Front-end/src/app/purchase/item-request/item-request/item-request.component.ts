import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { ItemRequestService } from '../item-request.service';
import { ItemRequest } from '../itemRquest';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item-request',
  templateUrl: './item-request.component.html',
  styleUrls: ['./item-request.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class ItemRequestComponent implements OnInit {
  displayedColumns: string[] = ['itemRequestId','itemRequestDate','action'];
  itemRequest!: MatTableDataSource<ItemRequest>;
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
  @ViewChild('itemRequestPrint') itemRequestElement!: ElementRef;
  pdfTable!: ElementRef;
  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';


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
    private itemRequestService: ItemRequestService,
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
    this.getAllItemRequest();
  }



  public getAllItemRequest(): void {
    this.itemRequestService.getAllItemRequest().subscribe(
      (response) => {
        this.itemRequest = new MatTableDataSource(response);
        this.itemRequest.paginator =this.paginator;
        this.itemRequest.sort = this.matSort;
        // console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public deleteItemRequest(ItemRequestId:ItemRequest){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){
        this.itemRequestService.deleteItemRequest(ItemRequestId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')
        this.toaster.success(this.translate.instant('success'))
        this.getAllItemRequest();
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

    html2canvas(this.itemRequestElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.itemRequestElement.nativeElement.innerHTML);
      PDF.save(`ItemRequest.pdf`);
    });
  }




  filterData($event: any){
    this.itemRequest.filter = $event.target.value;
  }

}

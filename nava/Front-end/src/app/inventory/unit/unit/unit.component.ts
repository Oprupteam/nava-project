import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import {
  NgbdSortableHeader,
  SortEvent,
} from 'src/app/shared/directives/soratable.directive';
import { Unit } from '../Unit';
import { UnitService } from '../Unit.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class UnitComponent implements OnInit {
  displayedColumns: string[] = ['unitName','description','action'];

  unit!: MatTableDataSource<Unit>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  searchText:any;
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  // unit!: any;

  @ViewChild('unitprint') unitElement!: ElementRef;
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
    private toaster:ToastrService,
    // Language code
    private translate: TranslateService,
    private unitService: UnitService,

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
    this.getAllunit();
  }

  public getAllunit(): void {
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {

        this.unit = new MatTableDataSource(response);
        this.unit.paginator =this.paginator;
        this.unit.sort = this.matSort;
        console.log(response);
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public deleteUnit(unitId: Unit){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
     showCancelButton: true,
 cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){

        this.unitService.deleteUnit(unitId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')

        this.toaster.success(this.translate.instant('success'))
        this.getAllunit();


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

    html2canvas(this.unitElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');
      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.unitElement.nativeElement.innerHTML)
      PDF.save(`Unit.pdf`);
    });
  }



}

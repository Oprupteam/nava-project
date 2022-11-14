import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, VERSION, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { CountryService } from 'src/app/components/tables/table-services/counteries.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { SalaryObject } from '../salary-object';
import { SalaryObjectService } from '../salary-object.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-salaryObject',
  templateUrl: './salary-Object.component.html',
  styleUrls: ['./salary-Object.component.scss'],
  providers: [CountryService, DecimalPipe]

})
export class SalaryObjectComponent implements OnInit {


  displayedColumns: string[] = ['number', 'salaryObject','description', 'action'];
  salaryObjects!: MatTableDataSource<SalaryObject>;
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild(MatSort) matSort!: MatSort;


  countries$: Observable<Country[]>;
  total$: Observable<number>;
  // salaryObjects:any;

  @ViewChild('salaryObjectprint') salaryObjectElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private toaster:ToastrService,

    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private salaryObjectService: SalaryObjectService
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
    this.getAllSalaryObjects()
   }

  //  getAllSalaryObjects(){
  //    this.salaryObjectService.getAllSalaryObjects()
  //    .subscribe(data => this.salaryObjects = data)
  //  }
  getAllSalaryObjects(){
    this.salaryObjectService.getAllSalaryObjects()
    .subscribe((data:SalaryObject[]) =>{

     this.salaryObjects = new MatTableDataSource(data);
     this.salaryObjects.paginator =this.paginator;
     this.salaryObjects.sort = this.matSort;});
  }

   public deleteSalaryObject(salaryObjectId: SalaryObject){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText:this.translate.instant('cancel'),
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.salaryObjectService.deleteSalaryObject(salaryObjectId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
            this.getAllSalaryObjects();
          },
          (error) => {
            Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while Deleting Data'), 'error')
            this.toaster.error('Error')
          }
        );
      }


    })
}

@ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);

    delete (ws['D1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  public generatePDF(): void {

    html2canvas(this.salaryObjectElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');

      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.salaryObjectElement.nativeElement.innerHTML)
      PDF.save(`Reports.pdf`);
    });
  }

// name = 'Angular ' + VERSION.salaryObject;

printPage() {
  window.print();

}
}

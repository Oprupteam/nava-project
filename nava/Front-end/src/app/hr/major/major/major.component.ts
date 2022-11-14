import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, VERSION, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { CountryService } from 'src/app/components/tables/table-services/counteries.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import { Major } from '../major';
import { MajorService } from '../major.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss'],
  providers: [CountryService, DecimalPipe]

})
export class MajorComponent implements OnInit {

  displayedColumns: string[] = ['number', 'major','description', 'action'];
  majors!: MatTableDataSource<Major>;
   @ViewChild('paginator') paginator!: MatPaginator;
   @ViewChild(MatSort) matSort!: MatSort;

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChild('majorprint') majorElement!: ElementRef;
  pdfTable!: ElementRef;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private toaster:ToastrService,
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private majorService: MajorService
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
    this.getAllMajors()
   }

  //  getAllMajors(){
  //    this.majorService.getAllMajors()
  //    .subscribe(data => this.majors = data)
  //  }

  getAllMajors(){
    this.majorService.getAllMajors()
    .subscribe((data:Major[]) =>{

     this.majors = new MatTableDataSource(data);
     this.majors.paginator =this.paginator;
     this.majors.sort = this.matSort;});
  }

  filterData($event: any){
    this.majors.filter = $event.target.value;
  }

   public deleteMajor(majorId: Major){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to Delete The Record'),
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText:this.translate.instant('cancel'),
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.majorService.deleteMajor(majorId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
            this.getAllMajors();
          },
          (error) => {
            Swal.fire(this.translate.instant('Error'), this.translate.instant('Error while deleting Data'), 'error')
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

    html2canvas(this.majorElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');

      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.majorElement.nativeElement.innerHTML)
      PDF.save(`Reports.pdf`);
    });
  }

name = 'Angular ' + VERSION.major;

  printPage() {
    window.print();

  }
}

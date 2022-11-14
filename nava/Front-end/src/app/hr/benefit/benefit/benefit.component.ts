import { Component, ElementRef, OnInit, QueryList, VERSION, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import Swal from 'sweetalert2';
import { Benefit } from '../benefit';
import { BenefitService } from '../benefit.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { DecimalPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss'],
  providers: [CountryService, DecimalPipe]

})
export class BenefitComponent implements OnInit {

 displayedColumns: string[] = ['number', 'benefit', 'benefitDescription', 'action'];
 benefits!: MatTableDataSource<Benefit>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  countries$: Observable<Country[]>;
  total$: Observable<number>;
  
  @ViewChild('benefitprint') benefitElement!: ElementRef;
  pdfTable!: ElementRef;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private toaster:ToastrService,
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private benefitService: BenefitService
    ) {
      this.countries$ = service.countries$;
      this.total$ = service.total$;
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang')  || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }
  
  ngOnInit(): void {
    this.getAllBenefits()
   }

  //  getAllBenefits(){
  //    this.benefitService.getAllBenefits()
  //    .subscribe(data => this.benefits = data)
  //  }


   getAllBenefits(){
    this.benefitService.getAllBenefits()
    .subscribe((data:Benefit[]) =>{

     this.benefits = new MatTableDataSource(data);
     this.benefits.paginator =this.paginator;
     this.benefits.sort = this.matSort;});
  }


  filterData($event: any){
    this.benefits.filter = $event.target.value;
  }

   public deleteBenefit(benefitId: Benefit){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText:this.translate.instant('cancel'),
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.benefitService.deleteBenefit(benefitId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
            this.getAllBenefits();
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

    html2canvas(this.benefitElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');

      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.benefitElement.nativeElement.innerHTML)
      PDF.save(`Reports.pdf`);
    });
  }

name = 'Angular ' + VERSION.major;

  printPage() {
    window.print();

  }

}

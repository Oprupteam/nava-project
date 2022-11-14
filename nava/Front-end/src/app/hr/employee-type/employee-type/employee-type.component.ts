import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, VERSION, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { CountryService } from 'src/app/components/tables/table-services/counteries.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { EmployeeType } from '../employee-type';
import { EmployeeTypeService } from '../employee-type.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employeeType',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.scss'],
  providers: [CountryService, DecimalPipe]

})
export class EmployeeTypeComponent implements OnInit {
  
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  employeeTypes: any;

  @ViewChild('employeeTypeprint') employeeTypeElement!: ElementRef;
  pdfTable!: ElementRef;


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  form: FormGroup = new FormGroup({

  
  });
  invoiceElement: any;

  constructor(
    private toaster:ToastrService,
    public service: CountryService,
    // Language code
    private translate: TranslateService,
    private employeeTypeService: EmployeeTypeService
    ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    // Language code
    this.translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang')  || 'en';
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
    this.getAllEmployeeTypes()
   }
 
   
   getAllEmployeeTypes(){
     this.employeeTypeService.getAllEmployeeTypes()
     .subscribe(data => this.employeeTypes = data)
   }

   public deleteEmployeeType(employeeTypeId: EmployeeType){
    Swal.fire({
      icon: 'info',
      title: this.translate.instant('Are you Sure to delete The Record'),
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText:this.translate.instant('cancel'),
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.employeeTypeService.deleteEmployeeType(employeeTypeId).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('Data Is Deleted'), 'success')
           this.toaster.success(this.translate.instant('success'))
            this.getAllEmployeeTypes();
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
  paginator: any;
  matSort: any;

  ExportTOExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);

    delete (ws['D1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  public generatePDF(): void {

    html2canvas(this.employeeTypeElement.nativeElement, { scale: 2,allowTaint:true,useCORS:true }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/PNG');

      const fileWidth = 210;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
       PDF.html(this.employeeTypeElement.nativeElement.innerHTML)
      PDF.save(`Reports.pdf`);
    });
  }

name = 'Angular ' + VERSION.major;
   
  printPage() {
    window.print();
    
  }
}
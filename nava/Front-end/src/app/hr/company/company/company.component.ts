import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/components/tables/table-modal/countreies.modal';
import { CountryService } from 'src/app/components/tables/table-services/counteries.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [CountryService, DecimalPipe]

})
export class CompanyComponent implements OnInit {

  countries$: Observable<Country[]>;
  total$: Observable<number>;
  companies: any;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public service: CountryService,
    public companyService: CompanyService
    ) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
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
    this.getAllCompanies()
  }

  public getAllCompanies(){
    this.companyService.getAllCompanies()
     .subscribe(data => this.companies = data)
  }
}

import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { max } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Partner } from 'src/app/hr/company/partner';
import { Items } from 'src/app/inventory/items/Items';
import { ItemsService } from 'src/app/inventory/items/items.service';
import Swal from 'sweetalert2';
import { LocalPurchaceOrderService } from '../../local-purchace-order/localPurchaceOrder.service';
import { ItemRequestService } from '../item-request.service';
import { ItemRequestDetails } from '../ItemRequestDetails';

@Component({
  selector: 'app-create-item-request',
  templateUrl: './create-item-request.component.html',
  styleUrls: ['./create-item-request.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreateItemRequestComponent implements OnInit {
  displayedColumns: string[] = ['quantityPackage', 'quantity', 'itemName', 'categoryName', 'unitName', 'vendorName', 'barCode', 'action'];

  itemsDetailsById!: MatTableDataSource<any>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  items!: any;
  year: any;

  itemsDetails: any;
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



  itemRequestData = {

    itemRequestId: '',

    itemRequestDate: '',

    deleteFlag: 1
  }

  itemRequestDetailsData = {
    localPurchaceOrderDetailsId: '',
    itemRequestQuantity: '',
    itemRequest: {
      itemRequestId: '',
    },
    localPurchaceOrder: null,
    items: {
      itemsId: ''
    },
    localPurchaceOrderQuantity: '',
    purchasingPrice: '',

    taxRates: '',

    discount: '',

    total: '',

    description: '',
    deleteFlag: 1
  }


  form: FormGroup = new FormGroup({

    itemRequestDate: new FormControl(''),

  });


  constructor(
    public service: CountryService,
    private itemsService: ItemsService,
    private modalService: NgbModal,
    // Language code
    private translate: TranslateService,
    private router: Router,
    private itemRequestService: ItemRequestService,
    private toaster: ToastrService,
    private localPurchaceOrderService: LocalPurchaceOrderService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
  ) {

    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;

  }


  public getAllItemsById(ItemRequest: any): void {

    this.localPurchaceOrderService.getLocalPurchaseDetailsByItemRequest(ItemRequest).subscribe(
      (response: any) => {
        this.itemsDetailsById = new MatTableDataSource(response);
        this.itemsDetailsById.paginator = this.paginator;
        this.itemsDetailsById.sort = this.matSort;
        console.log(response);
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllItems(): void {
    this.itemsService.getAllItems().subscribe(
      (response: Items[]) => {
        this.items = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  isLoggedIn = true;
  getItemByItemCode(event: any) {

    this.itemsService.getItemsById(event).subscribe(data => {
      this.itemsDetails = data
      this.isLoggedIn = false;

    })

  }
  count() {
    this.itemRequestService.count().subscribe((data: number) => {

      this.itemRequestData.itemRequestId = `${data + 1}`
    })
  }
  count2() {
    this.itemRequestService.count().subscribe((data: number) => {
      this.itemRequestDetailsData.itemRequest.itemRequestId = `${data}`
    })
  }



  ngOnInit(): void {
    this.getAllItems();
    this.count();

    this.form = this.fb.group(
      {
        itemRequestDate: [null, Validators.compose([
          Validators.required,
        ])],

      }

    )

  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  addItemRequestDetails() {
    // this.addItemRequest()
    this.itemRequestService.addItemRequest(this.itemRequestData).subscribe(
      () => {
        this.itemRequestDetailsData.itemRequest.itemRequestId = this.itemRequestData.itemRequestId

        this.localPurchaceOrderService.addLocalPurchaceOrderDetails(this.itemRequestDetailsData).subscribe(
          () => {
            this.getAllItemsById(this.itemRequestData.itemRequestId);
            this.router.navigate(['/itemRequest/create-itemRequest'])
            this.modalService.dismissAll()
          }

        )
        this.count2();
        this.router.navigate(['/itemRequest/create-itemRequest'])
      }
    )

    console.log("itemRequestDetailsData: ", this.itemRequestDetailsData)
  }

  Select2Update(select2modal: any, p: any) {
    this.itemRequestDetailsData = p
    this.modalService.open(select2modal);

  }


  deletePartner(p: any) {

    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText: this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {

        this.localPurchaceOrderService.deleteLocalPurchaceOrderDetails(p).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')

            this.getAllItemsById(p.itemRequest.itemRequestId);

            this.toaster.success(this.translate.instant('success'))

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

  public addItemRequest(): void {
    this.router.navigate(['/itemRequest/itemRequest'])
  }



  Select2Open(select2modal: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.modalService.open(select2modal);

  }

}


import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Items } from 'src/app/inventory/items/Items';
import { ItemsService } from 'src/app/inventory/items/items.service';
import Swal from 'sweetalert2';
import { ItemRequestService } from '../../item-request/item-request.service';
import { LocalPurchaceOrderService } from '../localPurchaceOrder.service';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from 'src/app/inventory/vendor/Vendor.service';
import { Vendor } from 'src/app/inventory/vendor/Vendor';

@Component({
  selector: 'app-create-local-purchace-order',
  templateUrl: './create-local-purchace-order.component.html',
  styleUrls: ['./create-local-purchace-order.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreateLocalPurchaceOrderComponent implements OnInit {
  ItemRequestDetailsID!:any;

  form: FormGroup = new FormGroup({

    localPurchaceOrderType: new FormControl(''),
    localPurchaceOrderDate: new FormControl(''),
      vendorId: new FormControl(''),


  });

  localPurchaceOrderData = {
    localPurchaceOrderId: '',
    localPurchaceOrderNumber: '',
    localPurchaceOrderType: '',
    localPurchaceOrderDate: '',
    vendor: {
      vendorId: '',
    },
    deleteFlag: 1
  }

  localPurchaceOrderDetailsData = {

    localPurchaceOrderDetailsId: '',
    itemRequestQuantity: '',
    localPurchaceOrder: {
    localPurchaceOrderId: '',
    },
    items: {
      itemsId: '',
      itemName: '',
      barCode: '',
      category: {
        categoryName: '',
      },
      unit: {
        unitName: '',
      },
      quantity: '',
    },
    localPurchaceOrderQuantity: '',
    purchasingPrice: '',

    taxRates: '',

    discount: '',

    total: '',

    description: '',
    deleteFlag: 1,
    itemRequest: null,
  }

  localPurchaceOrderDetailsData2 = {
    localPurchaceOrderDetailsId: '',
    itemRequestQuantity: '',
    localPurchaceOrderQuantity: '',
    purchasingPrice: '',

    taxRates: '',

    discount: '',

    total: '',

    description: '',
    itemRequest: {
      itemRequestId: '',
    },
    items: {
      itemsId:'',
    },
    localPurchaceOrder:{
      localPurchaceOrderId: '',

    },
    deleteFlag: 1
  }

  allItems: any;
  vendor: any;
  itemsDetailsById!: any;
  itemsDetailsBy!: any;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

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
    private toaster: ToastrService,

    private matdialog: MatDialog
    )
    {
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;

  }


  public getAllLocalPurchaceOrderDetailsByLocalPurchaceOrderId(LocalPurchaceOrderId: any): void {
    this.localPurchaceOrderService.getLocalPurchaceOrderDetailsByLocalPurchaceOrderId(LocalPurchaceOrderId).subscribe(
      (response: any) => {
        this.itemsDetailsById = response;
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
    this.localPurchaceOrderService.count().subscribe((data: number) => {

      this.localPurchaceOrderData.localPurchaceOrderId = `${data + 1}`
      this.localPurchaceOrderData.localPurchaceOrderNumber = `${data + 1}`
    })
  }


  ngOnInit(): void {
    this.getAllItems();
    this.count();

    this.getAllVendor();
    this.getAllItemRequest();

    this.form = this.fb.group(
      {

        localPurchaceOrderType: [null, Validators.compose([
          Validators.required,
        ])],
        localPurchaceOrderDate: [null, Validators.compose([
          Validators.required,
        ])],
          vendorId: [null, Validators.compose([
            Validators.required,
          ])],

      }

    )

  }

  public getAllVendor(): void {
    this.vendorService.getAllVendor().subscribe(
      (response: Vendor[]) => {
        this.vendor = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  addLocalPurchaceOrder() {

    this.localPurchaceOrderService.addLocalPurchaceOrder(this.localPurchaceOrderData).subscribe(
      () => {
        this.localPurchaceOrderDetailsData.localPurchaceOrder.localPurchaceOrderId = this.localPurchaceOrderData.localPurchaceOrderId
        this.localPurchaceOrderService.addLocalPurchaceOrderDetails(this.localPurchaceOrderDetailsData).subscribe(
          () => {
            this.getAllLocalPurchaceOrderDetailsByLocalPurchaceOrderId(this.localPurchaceOrderData.localPurchaceOrderId);
            this.router.navigate(['/LocalPurchaceOrder/create-LocalPurchaceOrder'])
            this.modalService.dismissAll()
          }
        )
      }
    )

    console.log("localPurchaceOrderDetailsData: ", this.localPurchaceOrderDetailsData)
  }

  Select2Update(select2modal2: any, p: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.localPurchaceOrderDetailsData = p

    this.modalService.open(select2modal2, { windowClass: 'my-class' });

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

            this.getAllLocalPurchaceOrderDetailsByLocalPurchaceOrderId(p.localPurchaceOrder.localPurchaceOrderId);

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

  Select2Open(select2modal: any) {

 this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.modalService.open(select2modal, { windowClass: 'my-class' });

  }


  // addLocalDirect
  getItemByRequestNumber2(event: any) {
    let arry = [
      {id:1,name:'xx',age:''},
      {id:2,name:'yyy',age:''},
    ]
    let filterAry = arry.find((obj:any)=>{
      return obj.id == event
    })
    for(let prop in filterAry){
      // filterAry[prop]= this.requestForm.value[prop]
    }


    this.localPurchaceOrderService.getLocalPurchaceOrderDetailsByItemRequestDetailsId(event).subscribe(data => {
      this.itemsDetailsBy = data
      console.log("itemsDetailsBy:;", this.itemsDetailsBy)

      this.itemsDetailsBy.forEach((element: any) => {
        this.localPurchaceOrderService.getLocalPurchaceOrderDetailsByLocalPurchaceOrderId(Number(element.itemRequestDetails.itemRequestDetailsId)).subscribe((res: any) => {
          if (Object.keys(res).length != 0) {

            element.localPurchaceOrderQuantity = res.localPurchaceOrderQuantity,
              element.purchasingPrice = res.purchasingPrice,
              element.taxRates = res.taxRates,
              element.discount = res.discount,
              element.total = res.total,
              element.description = res.description

          }
          else {
          }


          console.log('this.itemsDetailsById', this.itemsDetailsBy)

        })
      })
    })

  }

  getItemByRequestNumber(event: any) {

    this.localPurchaceOrderService.getLocalPurchaseDetailsByItemRequest(event).subscribe(data => {
      this.itemsDetailsBy = data
      console.log("this.itemsDetailsBy::",  this.itemsDetailsBy)
      })
    }



  public getAllItemRequest(): void {
    this.itemRequestService.getAllItemRequest().subscribe(
      (response) => {
        this.itemRequest = response;
        console.log('this.itemRequest', this.itemRequest);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }


    localPurchaceOrderbyId:any;
    localPurchaceOrderbyItemDetailsId:any;


    Select2Update2(select2modal22: any, p: any) {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
    console.log("p",p)
    // this.ItemRequestDetailsID=p;
    this.localPurchaceOrderService.getLocalPurchaseOrderDetailsById(p).subscribe(data => {
      this.localPurchaceOrderbyId = data
      this.localPurchaceOrderbyItemDetailsId=this.localPurchaceOrderbyId;
      this.localPurchaceOrderDetailsData2.localPurchaceOrderDetailsId= this.localPurchaceOrderbyItemDetailsId.localPurchaceOrderDetailsId,
      this.localPurchaceOrderDetailsData2.itemRequest.itemRequestId= this.localPurchaceOrderbyItemDetailsId.itemRequest.itemRequestId,
      this.localPurchaceOrderDetailsData2.items.itemsId= this.localPurchaceOrderbyItemDetailsId.items.itemsId,
      this.localPurchaceOrderDetailsData2.description= this.localPurchaceOrderbyItemDetailsId.description,
      this.localPurchaceOrderDetailsData2.discount= this.localPurchaceOrderbyItemDetailsId.discount,
      this.localPurchaceOrderDetailsData2.localPurchaceOrderQuantity= this.localPurchaceOrderbyItemDetailsId.localPurchaceOrderQuantity,
      this.localPurchaceOrderDetailsData2.purchasingPrice= this.localPurchaceOrderbyItemDetailsId.purchasingPrice,
      this.localPurchaceOrderDetailsData2.taxRates= this.localPurchaceOrderbyItemDetailsId.taxRates,
      this.localPurchaceOrderDetailsData2.total= this.localPurchaceOrderbyItemDetailsId.total,

      console.log("this.localPurchaceOrderbyId::",  this.localPurchaceOrderbyItemDetailsId)
      })


    this.modalService.open(select2modal22);

  }


  deletePartner2(p: any) {

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

            this.getItemByRequestNumber(p.itemRequest.itemRequestId);

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


  addLocalPurchaceOrder2() {
    console.log('on localPurchaceOrderDetailsData2',this.localPurchaceOrderDetailsData2)
     this.localPurchaceOrderService.addLocalPurchaceOrder(this.localPurchaceOrderData).subscribe(
       (result:any) => {
       this.localPurchaceOrderDetailsData2.localPurchaceOrder.localPurchaceOrderId=this.localPurchaceOrderData.localPurchaceOrderId;
       this.localPurchaceOrderService.updateLocalPurchaceOrderDetails(this.localPurchaceOrderDetailsData2).subscribe(
          () => {
            this.getItemByRequestNumber(this.localPurchaceOrderDetailsData2.itemRequest.itemRequestId);
            this.router.navigate(['/LocalPurchaceOrder/create-LocalPurchaceOrder'])
            this.modalService.dismissAll()
          })}
           )
      }


      calculate(){
      this.localPurchaceOrderDetailsData2.total=(((Number(this.localPurchaceOrderDetailsData2.purchasingPrice)*Number(this.localPurchaceOrderDetailsData2.localPurchaceOrderQuantity))-Number(this.localPurchaceOrderDetailsData2.discount))
      *Number(this.localPurchaceOrderDetailsData2.taxRates)).toFixed(2)
      }

      calculate2(){
      this.localPurchaceOrderDetailsData.total=(((Number(this.localPurchaceOrderDetailsData.purchasingPrice)*Number(this.localPurchaceOrderDetailsData.localPurchaceOrderQuantity))-Number(this.localPurchaceOrderDetailsData.discount))
       *Number(this.localPurchaceOrderDetailsData.taxRates)).toFixed(2)

      }

}

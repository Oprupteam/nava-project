import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Items } from 'src/app/inventory/items/Items';
import { ItemsService } from 'src/app/inventory/items/items.service';
import { Store } from 'src/app/inventory/store/Store';
import { StoreService } from 'src/app/inventory/store/Store.service';
import { ItemRequestService } from 'src/app/purchase/item-request/item-request.service';
import { LocalPurchaceOrderService } from 'src/app/purchase/local-purchace-order/localPurchaceOrder.service';
import Swal from 'sweetalert2';
import { PurchaseInvoicesService } from '../purchaseInvoices.service';

@Component({
  selector: 'app-create-purchase-invoices',
  templateUrl: './create-purchase-invoices.component.html',
  styleUrls: ['./create-purchase-invoices.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class CreatePurchaseInvoicesComponent implements OnInit {
  purchaseInvoicesDetails: any;
  purchaseInvoicesDetail: any;
  store: any;
  storeByStoreCode: any;

  purchaseInvoicesData = {
    purchaseInvoicesId: '',
    invoicesNumber: '',
    purchaseInvoicesType: '',
    invoicesDate: '',
    vendorNumber: '',
    purchaseInvoicesNumber: '',
    purchaseInvoicesTax: '',
    vendorVatNumber: '',
    cost: '',
    lastPurchasePrice: '',
    purchaseInvoicesDate: '',
    quantityAvailable: '',
     deleteFlag: 1,
  };

  LocalPurchaceOrderItemData={
    purchaseInvoicesItemId: '',
    costCenter: '',
    purchasingAccount: '',
    fundAccount: '',
    taxCalculation: '',
    purchasingAmount:'',
    purchasingDiscount:'',
    purchasingTax:'',
    purchasingTotal:'',
    purchasingNet:'',
    deleteFlag: 1,
    purchaseInvoices: {
      purchaseInvoicesId: '',
    }}



  form: FormGroup = new FormGroup({
    purchaseInvoicesType: new FormControl(''),
    invoicesDate: new FormControl(''),
    vendorNumber: new FormControl(''),
    purchaseInvoicesNumber: new FormControl(''),
    purchaseInvoicesTax:new FormControl(''),
    vendorVatNumber: new FormControl(''),
    cost: new FormControl(''),
    lastPurchasePrice: new FormControl(''),
    purchaseInvoicesDate: new FormControl(''),
    quantityAvailable: new FormControl(''),
  });


  purchaseInvoicesDetailsData = {
    purchaseInvoicesDetailsId: '',
    quantityPurchaseInvoices: '',
    totalBeforeTax: '',
    totalAfterTax: '',
    unitBeforeTax: '',
    unitAfterTax: '',
    discountPercentage: '',
    // net: '',
    items: {
      itemsId: '',
    },
    store: {
      storeId: '',
    },
    purchaseInvoices: {
      purchaseInvoicesId: '',
    },
    expiryDateItem: '',
    deleteFlag: 1,
  };

  items: any;
  year: any;
  itemsDetailsById: any;
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
  hiddenDiv = false;

  constructor(
    public service: CountryService,
    private itemsService: ItemsService,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
    // Language code
    private translate: TranslateService,
    private router: Router,
    private itemRequestService: ItemRequestService,
    private localPurchaceOrderService: LocalPurchaceOrderService,
    private purchaseInvoicesService: PurchaseInvoicesService,
    private toaster: ToastrService,
    private storeService: StoreService,
    public fb: FormBuilder // Form Builder service for Reactive forms
  ) {
    // Language code
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }

  ngOnInit(): void {
    this.getAllItems();
    this.getAllStore();
    this.count();
    this.form = this.fb.group(
      {
        purchaseInvoicesType: [null, Validators.compose([Validators.required])],
        invoicesDate: [null, Validators.compose([Validators.required])],
        vendorNumber: [null, Validators.compose([Validators.required])],
        purchaseInvoicesNumber: [null, Validators.compose([Validators.required])],
        purchaseInvoicesTax:[null, Validators.compose([Validators.required])],
        vendorVatNumber: [null, Validators.compose([Validators.required])],
        cost: [null, Validators.compose([Validators.required])],
        lastPurchasePrice: [null, Validators.compose([Validators.required])],
        purchaseInvoicesDate: [null, Validators.compose([Validators.required])],
        quantityAvailable: [null, Validators.compose([Validators.required])],      }
    )
  }
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  isLoggedIn = true;
  isLoggedIn2 = true;
  getItemByItemCode(event: any) {
    this.itemsService.getItemsById(event).subscribe((data) => {
      this.itemsDetails = data;

      this.isLoggedIn = false;
    });
  }
  getStoreByStoreCode(event: any) {
    this.storeService.getStoreById(event).subscribe((data) => {
      this.storeByStoreCode = data;
      this.isLoggedIn2 = false;
    });
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

  public getAllStore(): void {
    this.storeService.getStores().subscribe(
      (response: Store[]) => {
        this.store = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  Select2Open(select2modal: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.modalService.open(select2modal, { windowClass: 'my-class' });
  }
  Select2Update(select2modal: any, p: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.purchaseInvoicesDetailsData = p;
    this.modalService.open(select2modal, { windowClass: 'my-class' });
  }

  count() {
    this.purchaseInvoicesService.count().subscribe((data: number) => {
      this.purchaseInvoicesData.purchaseInvoicesId = `${data + 1}`;
      this.purchaseInvoicesData.invoicesNumber = `${data + 1}`;
    });
  }
  isLoggedItem = true;

  addPurchaseInvoices() {
    // this.addItemRequest()
    console.log("on add ",this.purchaseInvoicesData)
    console.log("on add this.purchaseInvoicesDetailsData ",this.purchaseInvoicesDetailsData)


    this.purchaseInvoicesService
      .addPurchaseInvoices(this.purchaseInvoicesData)
      .subscribe(() => {
        this.purchaseInvoicesDetailsData.purchaseInvoices.purchaseInvoicesId =
          this.purchaseInvoicesData.purchaseInvoicesId;

        this.purchaseInvoicesService.addPurchaseInvoicesDetails(this.purchaseInvoicesDetailsData)
          .subscribe(() => {
            this.getAllPurchaseInvoicesDetailsDataByPurchaseInvoicesId(
              this.purchaseInvoicesData.purchaseInvoicesId
            );
            console.log(
              'this.purchaseInvoicesDetailsData',
              this.purchaseInvoicesDetailsData
            );
            console.log('this.purchaseInvoicesData', this.purchaseInvoicesData);
            this.router.navigate(['/purchaseInvoices/create-purchaseInvoices']);
            this.modalService.dismissAll();
            this.isLoggedItem = false;


          });
      });

  }

  public getAllPurchaseInvoicesDetailsDataByPurchaseInvoicesId(
    PurchaseInvoicesId: any
  ): void {
    this.purchaseInvoicesService
      .getPurchaseInvoicesDetailsByPurchaseInvoicesId(PurchaseInvoicesId)
      .subscribe(
        (response: any) => {
          this.purchaseInvoicesDetails = response;
         this.purchaseInvoicesDetail=this.purchaseInvoicesDetails ;
         this.calculatePurchasingAmount();
          console.log("this.purchaseInvoicesDetails: ",this.purchaseInvoicesDetails)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
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
        this.purchaseInvoicesService.deletePurchaseInvoicesDetails(p).subscribe(
          (response) => {
            Swal.fire(
              this.translate.instant('success'),
              this.translate.instant('dataisDeleted'),
              'success'
            );

            this.getAllPurchaseInvoicesDetailsDataByPurchaseInvoicesId(
              p.purchaseInvoices.purchaseInvoicesId
            );

            this.toaster.success(this.translate.instant('success'));

            //location.reload();
          },
          (error) => {
            Swal.fire(
              this.translate.instant('error'),
              this.translate.instant('errorwhiledeletingData'),
              'error'
            );

            this.toaster.error(this.translate.instant('error'));
          }
        );
      }
    });
  }




  addLocalPurchaceOrderItem() {
    // this.addItemRequest()

    console.log("this.LocalPurchaceOrderItemData",this.LocalPurchaceOrderItemData)
    console.log("this.purchaseInvoicesData",this.purchaseInvoicesData)


        this.LocalPurchaceOrderItemData.purchaseInvoices.purchaseInvoicesId= this.purchaseInvoicesDetails[0].purchaseInvoices.purchaseInvoicesId;
        this.purchaseInvoicesService.addLocalPurchaceOrderItem(this.LocalPurchaceOrderItemData).subscribe(() => {
          console.log('this.LocalPurchaceOrderItemData',this.LocalPurchaceOrderItemData);
          this.router.navigate(['/purchaseInvoices/purchaseInvoices']);
          });
      }


    calculateTotalBeforeTax(){
    this.purchaseInvoicesDetailsData.totalBeforeTax=(Number(this.purchaseInvoicesDetailsData.quantityPurchaseInvoices)*Number(this.purchaseInvoicesDetailsData.unitBeforeTax)-Number(this.purchaseInvoicesDetailsData.discountPercentage)).toFixed(2)
    this.purchaseInvoicesDetailsData.totalAfterTax=(Number(this.purchaseInvoicesDetailsData.totalBeforeTax)+Number(this.purchaseInvoicesDetailsData.totalBeforeTax)*Number(this.itemsDetails.tax)/100).toFixed(2)
     }

amount:any;
discount:any;
tax:any;

calculatePurchasingAmount(){
  this.amount=0;
   this.tax=0;
   this.discount=0;
      for (let purchasingAmounts of this.purchaseInvoicesDetail) {
         console.log("this.purchaseInvoicesDetails",this.purchaseInvoicesDetail)
         this.amount= (Number(this.amount)+Number(purchasingAmounts.totalBeforeTax)).toFixed(2)
         this.discount=(Number(this.discount)+Number(purchasingAmounts.discountPercentage)/100).toFixed(2)
         this.tax= (Number(this.tax)+(Number(purchasingAmounts.totalAfterTax)-Number(purchasingAmounts.totalBeforeTax))).toFixed(2)
     }
     this.LocalPurchaceOrderItemData.purchasingAmount=this.amount
     this.LocalPurchaceOrderItemData.purchasingDiscount= this.discount
     this.LocalPurchaceOrderItemData.purchasingTax=this.tax
     this.LocalPurchaceOrderItemData.purchasingTotal=(this.amount-Number(this.LocalPurchaceOrderItemData.purchasingDiscount)).toFixed(2)

     this.LocalPurchaceOrderItemData.purchasingNet=(
      (Number(this.LocalPurchaceOrderItemData.purchasingTotal)-(Number(this.LocalPurchaceOrderItemData.purchasingDiscount)))*(Number(this.LocalPurchaceOrderItemData.purchasingTax))).toFixed(2)


     console.log("this.LocalPurchaceOrderItemData.purchasingAmount:  ",this.LocalPurchaceOrderItemData.purchasingAmount)

    }


}

import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/components/tables/counteries.service';
import { Items } from 'src/app/inventory/items/Items';
import { ItemsService } from 'src/app/inventory/items/items.service';
import Swal from 'sweetalert2';
import { LocalPurchaceOrderService } from '../../local-purchace-order/localPurchaceOrder.service';
import { ItemRequestService } from '../item-request.service';

@Component({
  selector: 'app-update-item-request',
  templateUrl: './update-item-request.component.html',
  styleUrls: ['./update-item-request.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class UpdateItemRequestComponent implements OnInit {


  ItemRequestDetailsID=this.activateRoute.snapshot.params['id'];
  ItemRequestDetails:any;

  itemRequestDetailsData = {
    localPurchaceOrderDetailsId: '',
    itemRequestQuantity: '',
    itemRequest: {
      itemRequestId: '',
    },
    localPurchaceOrder: null,
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
    deleteFlag: 1
  }

  items:any;
  year:any;
  itemsDetailsById:any;
  itemsDetails:any;
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
  hiddenDiv = false;



  constructor(
    public service: CountryService,
    private itemsService: ItemsService,
    private modalService: NgbModal,
    private activateRoute:ActivatedRoute,
    // Language code
    private translate: TranslateService,
    private router: Router,
    private itemRequestService: ItemRequestService,
    private localPurchaceOrderService: LocalPurchaceOrderService,
    private toaster:ToastrService,
    public fb: FormBuilder, // Form Builder service for Reactive forms
  )    {

   // Language code
   this.translate.setDefaultLang('ar');
   const lang = localStorage.getItem('lang') || 'ar';
   this.translate.use(lang);
   document.documentElement.lang = lang;

   }


  ngOnInit(): void {
    this.getAllItemsDetailsByItemRequest()
    this.getAllItems()

  }

  public getAllItemsDetailsByItemRequest(): void {


    this.localPurchaceOrderService.getLocalPurchaseDetailsByItemRequest(this.ItemRequestDetailsID).subscribe(
      (response) => {

        if(Object.keys(response).length != 0){
          this.ItemRequestDetails = response;
        }
        else{
          this.ItemRequestDetails = '';
        }

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  Select2Open(select2modal:any) {

    this.modalService.open(select2modal);

  }
  Select2Update(select2modal:any,p:any) {
    this.itemRequestDetailsData=p
    this.modalService.open(select2modal);

  }


  deletePartner(p:any){

    Swal.fire({
      icon: 'info',
      title: this.translate.instant('areyousuretodeletetherecord'),
      confirmButtonText:this.translate.instant('delete'),
      showCancelButton: true,
      cancelButtonText: this.translate.instant('cancel'),
    }).then((result) => {
      if(result.isConfirmed){

        this.localPurchaceOrderService.deleteLocalPurchaceOrderDetails(p).subscribe(
          (response) => {
            Swal.fire(this.translate.instant('success'), this.translate.instant('dataisDeleted'), 'success')

            this.getAllItemsDetailsByItemRequest();

          this.toaster.success(this.translate.instant('success'))

            //location.reload();

          },
          (error) => {
            Swal.fire(this.translate.instant('error'), this.translate.instant('errorwhiledeletingData'), 'error')

        this.toaster.error(this.translate.instant('error'))
          }
        );} }) }

   addItemRequestDetails(){
    this.itemRequestDetailsData.itemRequest.itemRequestId=this.activateRoute.snapshot.params['id'];
    this.localPurchaceOrderService.addLocalPurchaceOrderDetails(this.itemRequestDetailsData).subscribe(
      () => {
       this.getAllItemsDetailsByItemRequest();

       this.modalService.dismissAll()
       }),
    (error: HttpErrorResponse) => {
      console.log("errrrrre",this.itemRequestDetailsData)}}

  isLoggedIn = true;
  getItemByItemCode(event: any){
    this.itemsService.getItemsById(event).subscribe(data=>{
      this.itemsDetails=data
      this.isLoggedIn = false;
     console.log('ddddd',data)
     })  }

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




}



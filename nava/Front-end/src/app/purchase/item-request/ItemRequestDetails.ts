export interface ItemRequestDetails{
  localPurchaceOrderDetailsId:String;
  itemRequestQuantity:String;
  // quantity:String;
  itemRequest:{
    itemRequestId:String;
  }
  items:{
    itemsId:string
  }
  deleteFlag: number;

};

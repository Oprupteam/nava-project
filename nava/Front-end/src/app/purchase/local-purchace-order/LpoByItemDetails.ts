export interface LpoByItemDetails{
  itemRequestDetailsId:String;
  quantityPackage:String;
  // quantity:String;
  itemRequest:{
    itemRequestId:String;
  }
  items:{
    itemsId:string;
    itemName:string;
    barCode:string;
    category:{
      categoryName:'';
    };
    unit:{
      unitName:'';
    };
    quantity:string;
  };
  localPurchaceOrder:{
  localPurchaceOrderId:string;};
  localPurchaceOrderQuantity:string;
  purchasingPrice:string;

  taxRates:string;

  discount:string;

  total:string;

  description:string;
  deleteFlag: number;

};

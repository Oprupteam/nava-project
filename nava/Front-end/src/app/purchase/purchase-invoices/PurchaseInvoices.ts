export interface PurchaseInvoices{
  purchaseInvoicesId:String;
  invoicesNumber:String;
  purchaseInvoicesType:String;
  invoicesDate:String;
  vendorNumber:String;
  purchaseInvoicesNumber:String;
  purchaseInvoicesTax:String;
  vendorVatNumber:String;
  cost:String;
  lastPurchasePrice:String;
  purchaseInvoicesDate:String;
  quantityAvailable:String;
  deleteFlag:number;
}

export interface PurchaseInvoicesItem{

  purchaseInvoicesItemId:String;
  costCenter:String;
  purchasingAccount:String;
  fundAccount:String;
  taxCalculation:String;
  purchasingAmount:String;
  purchasingDiscount:String;
  purchasingTax:String;
  purchasingTotal:String;
  purchasingNet:String;
  deleteFlag: number,
}

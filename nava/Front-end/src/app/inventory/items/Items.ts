export interface Items {
  itemsId: string;
  itemCode: string;
  itemName: string;
  itemNameEn: string;
  barCode: string;
  img: string;
  quantity: string;

  countryOfOrigin: string;
  subCategory: {
    subcategoryId: string;
  },
  category: {
    categoryId: string;
  },
  unit: {
    unitId: string;
  },
  vendor: {
    vendorId: string;
  },

  expiryDate: string;
  sellingPrice: string;
  buyingPrice: string;
  lastBuyingPrice: string;
  taxFree: string;
  price: string;
  tax: string;

  deleteFlag: number;
}

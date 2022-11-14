import { Category } from "../category/Category";

export interface SubCategory {
  subcategoryId: string;
  subcategoryName: string;
  description: string;
  deleteFlag: number;
  category:{
    categoryId:string
  },
  };


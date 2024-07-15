export interface ProductFamilyResponse {
  productFamilies: ProductFamily[];
}

export interface ProductFamily {
  id:   number;
  name: string;
}


export interface ProductResponse {
  allProducts: Product[];
}

export interface Product {
  id:              number;
  name:            string;
  salePrice:       string;
  productFamily:   ProductFamily;
}

export interface ProductFamily {
  id:   number;
  name: string;
}




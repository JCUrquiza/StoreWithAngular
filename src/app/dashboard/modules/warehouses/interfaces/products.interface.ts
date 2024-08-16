export interface ProductsInWarehousesResponse {
  productsInWarehouse: ProductsInWarehouse[];
}

export interface ProductsInWarehouse {
  id:                 number;
  quantity:           number;
  warehousesByBranch: WarehousesByBranch;
  product:            Product;
}

export interface WarehousesByBranch {
  branch:    ProductFamily;
  warehouse: ProductFamily;
}



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
  codigoSKU:       string;
}

export interface ProductFamily {
  id:   number;
  name: string;
}




export interface ProductWorkOrder {
  id:           number;
  name:         string;
  codigoSKU:    string;
  familyname:   string;
  quantity:     number;
}




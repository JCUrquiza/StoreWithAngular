export interface WorkOrderResponse {
  workOrder: WorkOrder[];
}

export interface WorkOrder {
  id:         number;
  address:    string;
  priceTotal: number;
  customer:   Customer;
  status:   StatusID;
}

export interface Customer {
  id:              number;
  name:            string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  typeCustomer:  ID;
  branchOffice:  ID;
}

export interface ID {
  id:   number;
  name: string;
}

export interface StatusID {
  id:    number;
  name:  string;
  code:  string;
  color: string;
}








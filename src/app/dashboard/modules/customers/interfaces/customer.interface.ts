import { TypeCustomer  } from './type.customer.interface';

export interface CustomersResponse {
  customers: Customer[];
}

export interface CustomerResponse {
  customer: Customer;
}

export interface Customer {
  id:              number;
  name:            string;
  sureName:        string;
  secondSureName:  string;
  email:           string;
  address:         string;
  telephone:       string;
  typeCustomer:    TypeCustomer;
  branchOffice:    BranchOffice;
  status:          Status;
}

export interface BranchOffice {
  id:        number;
  name:      string;
  address:   string;
  email:     string;
  state:     string;
  companyId: number;
}

export interface Status {
  id:    number;
  name:  string;
  code:  string;
  color: string;
}



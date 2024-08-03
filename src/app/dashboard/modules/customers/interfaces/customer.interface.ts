import { TypeCustomer } from './type.customer.interface';

export interface CustomerResponse {
  customers: Customer[];
}

export interface Customer {
  id:              number;
  name:            string;
  apellidoPaterno: string;
  apellidoMaterno: string;
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

// export interface TypeCustomer {
//   id:   number;
//   name: string;
// }



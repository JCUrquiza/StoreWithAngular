export interface CompanyResponse {
  company: Company[];
}
export interface Company {
  id:      number;
  name:    string;
  email:   string;
  address: string;
}



export interface NewCompanyResponse {
  company: Company;
}
export interface Company {
  id:      number;
  name:    string;
  email:   string;
  address: string;
}



export interface UpdateCompanyResponse {
  id:      number;
  name:    string;
  email:   string;
  address: string;
}



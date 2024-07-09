export interface CompanyResponse {
  company: Company[];
}

export interface Company {
  id:      number;
  name:    string;
  email:   string;
  address: string;
}


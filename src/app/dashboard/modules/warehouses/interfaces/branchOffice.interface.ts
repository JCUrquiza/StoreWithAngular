export interface BranchOfficeResponse {
  branchesOffices: BranchesOffice[];
}

export interface BranchesOffice {
  id:        number;
  name:      string;
  address:   string;
  email:     string;
  state:     string;
  companyId: number;
  company:   CompanyOfBranchOffice;
}

export interface CompanyOfBranchOffice {
  id:      number;
  name:    string;
  email:   string;
  address: string;
}


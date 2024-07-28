export interface TicketsResponse {
  tickets: Ticket[];
}

export interface Ticket {
  id:          number;
  description: string;
  date:        Date;
  catalogue:   Catalogue;
  status:      Status;
  user:        User;
}

export interface Catalogue {
  id:     number;
  name:   string;
  module: string;
}

export interface Status {
  id:    number;
  name:  string;
  code:  string;
  color: string;
}

export interface User {
  id:   number;
  name: string;
}



export interface CatalogueResponse {
  catalogue: Catalogue[];
}

export interface Catalogue {
  id:     number;
  name:   string;
  module: string;
}



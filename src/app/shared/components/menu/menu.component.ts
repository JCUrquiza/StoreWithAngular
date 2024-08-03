import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  public menuItems: MenuItem[] = [];

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Warehouse system',
        icon: 'pi pi-fw pi-warehouse',
        items: [
          { label: 'Companies', icon: 'pi pi-building-columns', routerLink: '/dashboard/warehouses/company' },
          { label: 'Branch offices', icon: 'pi pi-shop', routerLink: '/dashboard/warehouses/branch-offices' },
          { label: 'Warehouses', icon: 'pi pi-inbox', routerLink: '/dashboard/warehouses/warehouses' },
          { label: 'Products', icon: 'pi pi-hammer', routerLink: '/dashboard/warehouses/products' },
          {
            label: 'Warehouse movements',
            icon: 'pi pi-arrow-right-arrow-left',
            routerLink: '/dashboard/warehouses/warehouses-movements'
          },
        ]
      },
      {
        label: 'Tickets',
        icon: 'pi-wallet',
        items: [
          { label: 'Make Ticket', icon: 'pi pi-ticket', routerLink: '/dashboard/tickets/list' },
        ]
      },
      {
        label: 'Customers',
        icon: 'pi pi-user',
        items: [
          { label: 'Create Customer', icon: 'pi pi-user-plus', routerLink: '/dashboard/customers/create' },
          { label: 'List Customers', icon: 'pi pi-users', routerLink: '/dashboard/customers/list' },
        ]
      },
    ]
  }

  public logout(): void {
    this.authService.logout();
  }

}

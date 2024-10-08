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
  public userOptions: MenuItem[] = [];

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

      {
        label: 'Work Order',
        icon: 'pi pi-book',
        items: [
          { label: 'Create', icon: 'pi pi-file-plus', routerLink: '/dashboard/workOrder/create' },
          { label: 'List', icon: 'pi pi-align-justify', routerLink: '/dashboard/workOrder/list' },
          { label: 'Details', icon: 'pi pi-file-edit', routerLink: '/dashboard/workOrder/details' },
        ]
      }
    ];

    this.userOptions = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            routerLink: '/dashboard/user/settings',
            shortcut: '⌘+O'
          },
          // {
          //   label: 'Messages',
          //   icon: 'pi pi-inbox',
          //   badge: '2'
          // },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q',
            command: () => this.logout()
          }
        ]
      }
    ];

  }

  public logout(): void {
    this.authService.logout();
  }

}

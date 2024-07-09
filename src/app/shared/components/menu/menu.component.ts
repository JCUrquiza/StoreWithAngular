import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  public menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Warehouse system',
        icon: 'pi pi-fw pi-warehouse',
        items: [
          { label: 'Main', icon: 'pi pi-building-columns', routerLink: '/' },
          { label: 'Warehouses', icon: 'pi pi-shop', routerLink: 'warehouses' },
          { label: 'Products', icon: 'pi pi-hammer', routerLink: 'products' },
          { label: 'Warehouse movements', icon: 'pi pi-arrow-right-arrow-left', routerLink: 'warehouses-movements' },
        ]
      },
      { label: 'Open', icon: 'pi pi-fw pi-download' },
      { label: 'Undo', icon: 'pi pi-fw pi-refresh' },
    ]
  }

}

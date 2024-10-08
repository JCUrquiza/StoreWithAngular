import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';


@NgModule({
  exports: [
    AvatarModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    MenubarModule,
    MenuModule,
    PanelModule,
    ProgressSpinnerModule,
    RippleModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class PrimeNgModule { }


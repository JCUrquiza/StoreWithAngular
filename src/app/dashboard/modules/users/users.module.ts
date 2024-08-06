import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [
    EditUserComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MsgViewComponent } from './components/msg-view/msg-view.component';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ComposeComponent } from './components/compose/compose.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SavedMessageComponent } from './components/saved-message/saved-message.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SideNavComponent,
    MsgViewComponent,
    ChatscreenComponent,
    ComposeComponent,
    SavedMessageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }

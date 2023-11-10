import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { MsgViewComponent } from './components/msg-view/msg-view.component';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ComposeComponent } from './components/compose/compose.component';
import { SavedMessageComponent } from './components/saved-message/saved-message.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'MsgView',component:MsgViewComponent},
    {path:'chatscreen',component:ChatscreenComponent},
    {path:'compose',component:ComposeComponent},
    {path:'saved',component:SavedMessageComponent},
    {path:'',redirectTo:'/admin/home',pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

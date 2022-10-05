import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { MessageAllComponent } from './message-all/message-all.component';
import { OneToOneComponent } from './one-to-one/one-to-one.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
{path:'', component:HomeComponent},
{path:'welcome', component:WelcomeComponent},
{path : 'chat',component:ChatBoxComponent},
{path : 'group',component:GroupComponent},
{path : 'messageAll',component:MessageAllComponent},
{path : 'one',component:OneToOneComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

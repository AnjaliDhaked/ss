import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { GroupComponent } from './group/group.component';
import { MessageAllComponent } from './message-all/message-all.component';
import { OneToOneComponent } from './one-to-one/one-to-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatBoxComponent,
    WelcomeComponent,
    GroupComponent,
    MessageAllComponent,
    OneToOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

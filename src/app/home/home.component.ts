import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName;
  socket: Socket;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.socket = io(`http://localhost:3000`);
  }

  addUser(name:any){
    console.log('User', name);
    this.commonService.user= name;
    // this.socket.emit('iam', name);
    // this.commonService.details.next({
    //   username: name,
    //   socket: this.socket
    // });
  }

}

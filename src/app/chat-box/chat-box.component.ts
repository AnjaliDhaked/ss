import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  socket:Socket;
  user;
  data: any;
  messages = [];
  userList: [];
  username: any;
  roomId = [];
  roomArea: any;
  roomsList = [];
  groups = {};
  textarea: any;
  constructor(private common:CommonService) { }
  ngOnInit(): void {
    this.socket = io(`http://localhost:3000`);
    do {
      this.username = this.common.user;
        console.log(this.username);
    
    } while (!this.username);
    this.socket.on('roomlist', (arrayRlist) => {
      this.roomsList = arrayRlist;
      console.log('This is from roomsList:' + this.roomsList);
    });
  }

  ngAfterViewInit() {
    this.socket.emit('iam', this.username);
    // Recieve messages

    this.socket.on('userActiveList', (msg) => {
      this.userList = msg;
      // console.log(msg);
    });

    this.socket.on('user-removed', (msg) => {
      // alert(msg + " " + 'has left')
      console.log(msg + ' ' + 'has left');
    });

    this.socket.on('user-added', (msg) => {
      // alert(msg.name + " " + 'has joined')
      console.log(msg.name + ' ' + 'has joined');
    });
  }

  appendMessage(msg, type) {
    // console.log("appendMessage(): ", msg, type)
    this.messages.push({ name: msg.user, mes: msg.mes, type: type });
  }

  //Room Listener
  createRoom() {
    this.socket.emit('createRoom', this.roomArea.value);
    console.log('createroom hit');
  }

  chatWindow(evt: any, messageType) {
    // let msg = this.textarea.value
    let id = evt.target.value;
    this.commonData({
      id,
      username: this.username,
      name: evt.target.innerText,
      socket: this.socket,
      roomList: this.roomsList,
      messageType,
    });
  }

  commonData(data: any) {
    this.common.dataDetails(data);
  }







  // ngOnInit(): void {
  //   this.socket = io(`http://localhost:3000`);
  //   this.socket.emit('iam', this.user);
   
  //   this.socket.on('userActiveList', (list) => {
  //     this.userList = list;
  //     this.userList;
  //     console.log(this.userList);
  //     this.common.list= this.userList;
  //     // this.userList= this.userList.filter(k => k[0] != this.socket.id);
      
  //     // console.log(this.userList);
  //   });

  //   this.socket.on('user-added', (msg) => {
  //     // alert(msg.name + " " + 'has joined')
  //     console.log(msg.name + ' ' + 'has joined');
  //   });

  // }
  // userClick(event,user:any){
  //    console.log(event, user, this.socket.id);
  //    this.common.oneToOneUser=user;
  //    this.common.id= event.target.value;
  //    console.log(this.common.id);
  // }
  // appendMessage(msg, type) {
  //   // console.log("appendMessage(): ", msg, type)
  //   this.messages.push({ name: msg.user, mes: msg.mes, type: type });
  // }
  // chatWindow(evt: any, messageType) {
  //   // let msg = this.textarea.value
  //   let id = evt.target.value;
  //   this.commonData({
  //     id,
  //     username: this.username,
  //     name: evt.target.innerText,
  //     socket: this.socket,
  //     roomList: this.roomsList,
  //     messageType,
  //   });

  //   if (messageType == 'messageGroup') {
  //     if (!this.groups[id]) {
  //       this.groups[id] = '1';
  //       this.socket.emit('joinRoom', id);
  //     }
  //   }

  //   if (messageType == 'message') {
  //     this.socket.emit('message', id);
  //   }
  // }

  // commonData(data: any) {
  //   this.common.dataDetails(data);
  // }
}

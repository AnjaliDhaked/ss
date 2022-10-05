import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-one-to-one',
  templateUrl: './one-to-one.component.html',
  styleUrls: ['./one-to-one.component.scss']
})
export class OneToOneComponent implements OnInit {
  oneToOne;
  messageSingle;
  userDetail;
  socket:Socket;
  // userList;
  id: string;
  userList: any;
  name: any;
  username: any;
  textarea: any;
  messageType: any;
  messageArea: any;
  event = false;
  roomname: any;
  allMessages = [];
  isNotSame = false;
  i = -1;
  id2 = 2;
  constructor(private common:CommonService) { 
    // this.userDetail= this.common.oneToOneUser;
    // this.oneToOne= this.common.oneToOneUser[1];
  }

  ngOnInit(): void {
    this.socket = io(`http://localhost:3000`);
    this.common.currentData.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.name = data.name;
      this.socket = data.socket;
      this.messageType = data.messageType;
      this.username = data.username;
      this.roomname = data.roomList.toString().split(',');
      
      console.log('this is socket:' + this.socket['id']);

      if (!this.event) {
        this.socket.on('group-receive', (msg) => {
          this.addMessages(msg, this.name);
          
        });

        this.socket.on('peer-receive', (msg) => {
          this.addMessages(msg, this.name);
         
        });

        this.socket.on('rmes', (msg) => {
        

          this.addMessages(msg, 'incoming');
          
        });

        this.event = true;
      }
    });
    // this.socket.on('peer-receive', (msg) => {
    //   console.log(msg, "msg");
    //   const element = document.createElement('div');
    //    element.innerHTML= msg.mes;
    //    element.classList.add("msg-info-name");
    //    document.getElementById('msg-text')?.appendChild(element);
     
    //  });
   
    //      this.socket.on('rmes', (msg) => {
    //      console.log(msg);
    //      const element = document.createElement('div');
    //      element.innerHTML= msg;
    //      element.classList.add("msg-info-name");
    //      document.getElementById('msg-text')?.appendChild(element);
    //  });

}

ngAfterViewInit() {
  this.textarea = document.querySelector('#textarea');
  this.messageArea = document.querySelector('.message__area');
}

send() {
  let msg = this.textarea.value;
  // console.log('from send message:'+msg);
  // this.allMessages = msg
  if (msg) {
    let msgObj = {
      id: this.id,
      user: this.name,
      mes: msg,
    };

    console.log(msgObj);

    // Append
    this.addMessages(msgObj, this.username);
    this.textarea.value = '';
    // scrollToBottom()

    // Send to server

    this.socket.emit(this.messageType, msgObj);
  }
}

addMessages(msg, type) {
  this.allMessages.push({ name: msg.user, mes: msg.mes, type: type });

  console.log('from addMessages:', this.allMessages);
  if (this.allMessages[0]?.name !== this.allMessages[1]?.name) {
    this.isNotSame = true;
  }
}
// ngAfterViewInit(){
  
//   // this.common.details.subscribe((res)=>{
//   //   console.log("res", res);
//   // })
//   this.socket.on('peer-receive', (msg) => {
//    console.log(msg, "msg");
//   //  const element = document.createElement('div');
//   //   element.innerHTML= msg.mes;
//   //   element.classList.add("msg-info-name");
//   //   document.getElementById('msg-text')?.appendChild(element);
//     // scrollToBottom()
//   });

//       this.socket.on('rmes', (msg) => {
//       console.log(msg);
//       // const element = document.createElement('div');
//       // element.innerHTML= msg;
//       // element.classList.add("msg-info-name");
//       // document.getElementById('msg-text')?.appendChild(element);
//   });

// }
//   sendMessage(message){
//    console.log(message);
//    this.userList= this.common.list;
//    console.log(this.userList);
//    let data= this.userList.filter((k)=>{
//     console.log(k, this.oneToOne);
//     return k[1]==this.common.user;
    
//    } );
//    console.log(data);
//    let msgObj = {
//     id: data[0],
//     user: this.common.user,
//     mes: message,
//   };
//    this.socket.emit("messageOne", msgObj);
//    const element = document.createElement('div');
//       element.innerHTML= message;
//       element.classList.add("msg-info-name");
//       document.getElementById('msg-text')?.appendChild(element);
//   //  this.common.details.subscribe((res)=>{
//   //   console.log("res", res);
//   // })
//   this.messageSingle='';
//   }

}

import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-message-all',
  templateUrl: './message-all.component.html',
  styleUrls: ['./message-all.component.scss']
})
export class MessageAllComponent implements OnInit {
  message;
  socket:Socket;
  user;
  constructor(private common:CommonService) { }

  ngOnInit(): void {
    this.socket = io(`http://localhost:3000`);
      // this.socket.emit('iam', name);
    this.user= this.common.user;

  }

  ngAfterViewInit(){
  

   this.socket.on('user-added', (msg) => {
      // alert(msg.name + " " + 'has joined')
      console.log(msg.name + ' ' + 'has joined');
    });
    this.socket?.on('rmes', (msg) => {
      console.log(msg);
      // const element1 = document.createElement('div');
      // element1.innerHTML= this.user;
      // element1.classList.add("msg-info-name");
      // document.getElementById('msg-info')?.appendChild(element1);



      
      const element = document.createElement('div');
    const element2 = document.createElement('div');
    element.classList.add('talk-bubble' ,'tri-right' , 'round', 'btm-left');
    element2.classList.add('talktext');
    element.appendChild(element2);
    element2.innerHTML= `<div>${msg.name}: ${msg.msg}</div>`
   
      document.getElementById('msg-text')?.appendChild(element);
      
    })



    this.socket.on('user-removed', (msg) => {
      // alert(msg + " " + 'has left')
      console.log(msg + ' ' + 'has left');
    });

    this.socket.on('user-added', (msg) => {
      // alert(msg.name + " " + 'has joined')
      console.log(msg.name + ' ' + 'has joined');
    });
  }

  sendMessage(msg:any){
    console.log(msg,"msg");
    let messagg={
       msg:msg,
       name:this.user
    }
    this.socket.emit('message', messagg);
    // const element1 = document.createElement('div');
    // element1.innerHTML= this.user;
    // element1.classList.add("msg-info-name");
    // document.getElementById('msg-info')?.appendChild(element1);
   

    const element = document.createElement('div');
    const element2 = document.createElement('div');
    element.classList.add('talk-bubble' ,'tri-right' , 'round', 'btm-left');
    element2.classList.add('talktext');
    element.appendChild(element2);
    element2.innerHTML= `<div>${this.user}: ${msg}</div>`
    document.getElementById('msg-text')?.appendChild(element);
   
    this.message='';
  }

}

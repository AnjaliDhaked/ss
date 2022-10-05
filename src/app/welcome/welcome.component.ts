import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userName;
  constructor(private commonService: CommonService) { 
   this.userName=this.commonService.user;
  }

  ngOnInit(): void {
  }

}

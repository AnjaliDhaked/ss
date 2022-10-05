import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user;
  oneToOneUser;
  details = new Subject;
  id;
  list;
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();

  constructor() {}

  dataDetails(data) {
    this.data.next(data);
  }

  // dataDetails(data) {
  //   this.details.next(data);
  // }
}

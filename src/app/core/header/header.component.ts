import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user = new UserModel('Alex', 'P');
  constructor() { }

  ngOnInit() {
  }

}

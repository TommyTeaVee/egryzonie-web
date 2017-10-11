import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/index';
import { Subscription } from 'rxjs/Subscription';

import { User } from '@interfaces/user';

@Component({
  selector: 'eg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eg';

  private _userSub: Subscription;
  public currentUser: User;

  constructor( private _user: UserService ) { }

  ngOnInit () {
    this._userSub = this._user.currentUser$
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        } else {
          this.currentUser = null;
        }
      });
  }

  ngOnDestroy () {
    this._userSub.unsubscribe();
  }
  
  logout() {
    this._user.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'interview';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.populate();
  }
}

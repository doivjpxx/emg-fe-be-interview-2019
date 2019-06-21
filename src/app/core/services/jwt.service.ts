import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class JwtService {

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  getToken(): String {
    if (isPlatformBrowser(this.platform)) {
      return window.localStorage['jwtToken'];
    }
  }

  saveToken(token: String) {
    if (isPlatformBrowser(this.platform)) {
      window.localStorage['jwtToken'] = token;
    }
  }

  destroyToken() {
    if (isPlatformBrowser(this.platform)) {
      window.localStorage.removeItem('jwtToken');
    }
  }

}

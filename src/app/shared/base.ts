import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BasePage implements OnDestroy {

  protected subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}

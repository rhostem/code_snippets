import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ModalAlertService {
  message: String;
  isVisible: Boolean;
  isConfirm: Boolean;
  confirmStream$ = new Subject<boolean>();
  confirmSub: Subscription;

  constructor() {
  }

  alert(message) {
    this.reset();
    this.message = message;
    this.isConfirm = false;
    this.isVisible = true;
  }

  confirm(message) {
    this.reset();
    this.message = message;
    this.isConfirm = true;
    this.isVisible = true;

    return new Promise((resolve, reject) => {
      this.confirmSub = this.confirmStream$.subscribe((isConfirmed) => {
        if (isConfirmed) {
          resolve(null);
          this.confirmSub.unsubscribe();
        } else {
          reject(null);
          this.confirmSub.unsubscribe();
        }
      });
    });
  }

  close() {
    this.reset();
  }

  reset() {
    this.message = '';
    this.isVisible = false;
    this.isConfirm = false;
  }
}

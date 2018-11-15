import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalAlertService } from '../../core/modal-alert.service';
import { isESC, isEnter } from '../../utils/keycode';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit, OnDestroy {
  get message() {
    return this.modalAlert.message;
  }

  get isVisible() {
    return this.modalAlert.isVisible;
  }

  get isConfirm() {
    return this.modalAlert.isConfirm;
  }

  constructor(
    private modalAlert: ModalAlertService,
  ) { }

  ngOnInit() {
    window.addEventListener('keyup', this.onPressESC.bind(this));
    window.addEventListener('keyup', this.onPressEnter.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('keyup', this.onPressESC.bind(this));
    window.removeEventListener('keyup', this.onPressEnter.bind(this));
  }

  onPressESC(e) {
    if (!this.isVisible) {
      return;
    }

    if (isESC(e.keyCode)) {
      this.onClose();
    }
  }

  onPressEnter(e) {
    if (!this.isVisible) {
      return;
    }

    if (isEnter(e.keyCode)) {
      this.onConfirm();
    }
  }

  /**
   * 닫기, 취소
   */
  onClose() {
    if (this.isConfirm) {
      this.modalAlert.confirmStream$.next(false);
      this.modalAlert.close();
    } else {
      this.modalAlert.close();
    }
  }

  onConfirm() {
    this.modalAlert.close();
    this.modalAlert.confirmStream$.next(true);
  }

}

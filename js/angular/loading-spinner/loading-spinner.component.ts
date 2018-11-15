import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService  } from '../../core/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div [ngClass]="spinnerClass"></div>
  `,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  isLoading: boolean;

  get spinnerClass() {
    return `loadingSpinner ${this.isLoading ? 'is-loading' : ''}`;
  }

  constructor(
    private spinner: LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.loadingStream.subscribe((state: boolean) => {
      this.isLoading = state;
    });
  }
}

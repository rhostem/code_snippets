import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountComma'
})
export class AmountCommaPipe implements PipeTransform {
  transform(key: number): string {
    const account = key ? key.toString() : '0';
    account.replace(/,/g, '');
    return account.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

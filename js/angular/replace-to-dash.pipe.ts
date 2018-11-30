import { Pipe, PipeTransform } from '@angular/core'

/**
 * target 값을 지정해서 일치하면 대쉬로 변환한다.
 *
 * @export
 * @class ReplaceToDashPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'replaceToDash',
})
export class ReplaceToDashPipe implements PipeTransform {
  transform(value: any, target?: any): any {
    return value === target ? '-' : value
  }
}

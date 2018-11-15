import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  /**
   * script, inline style 등을 제거하지 않고 그대로 표시한다.
   */
  transform(value): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

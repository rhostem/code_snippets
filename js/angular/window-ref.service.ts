import { Injectable } from '@angular/core'

function _window(): any {
  return window
}

@Injectable()
export class WindowRef {
  constructor() {}

  get nativeWindow(): any {
    return _window()
  }
}

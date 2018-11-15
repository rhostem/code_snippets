function myDeco(msg) {
  return function decorated(target, key, descriptor) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('only a function can be decorated!')
    }

    return {
      ...descriptor,
      value: function decoWrapper() {
        console.log('decorated message:' + msg)
        return descriptor.value.apply(this, arguments)
      },
    }
  }
}

class tester {
  @myDeco('myDeco?')
  test() {
    return 1
  }

  //     @myDeco
  //     member = 1;
}

var t = new tester()
t.test()

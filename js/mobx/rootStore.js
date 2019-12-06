import SampleStore from './SampleStore'
import { observable, action } from 'mobx'

class SampleStore {
  constructor(root) {
    if (!isServer) {
      this.root = root
    }
  }

  @observable
  data = {}

  @action
  handleChangeData = newData => {
    this.data = newData
  }
}

class RootStore {
  constructor(isServer, initialState) {
    this.sample = new SampleStore(this, initialState)
  }
}

export default RootStore

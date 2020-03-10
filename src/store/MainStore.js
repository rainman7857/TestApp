import { observable, computed, action, decorate } from "mobx";

class MainStore {
  testState = {};

  get getValues() {
    return this.testState
  }
  changeMain(obj) {
    this.testState = obj;
  }
}
export default decorate(MainStore, {
  testState: observable,
  getValues: computed,
  changeMain: action
});

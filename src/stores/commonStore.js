import { observable, action } from "mobx";

class CommonStore {
  @observable appName = "Cognito.React";
  @observable appLoaded = false;
  @observable isLoadingTags = false;

  @action
  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();

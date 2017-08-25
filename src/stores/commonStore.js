import { observable, action, reaction } from "mobx";
import agent from "../agent";

class CommonStore {
  @observable appName = "Cognito.React";
  @observable appLoaded = false;
  @observable isLoadingTags = false;
  @observable currentUser = null;

  @action
  setCurrentUser(userName) {
    this.currentUser = userName;
  }

  @action
  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();

import {GetterTree} from 'vuex';
import {State} from './state';

// State , RootState
const getters: GetterTree<State, State> = {
  loginStorage(state): any {
    const {loginStorage} = state;
    return localStorage;
  },
  loggedIn(state): boolean {
    const {loggedIn} = state;
    return loggedIn;
  },
  submittedContactInfo(state): boolean {
    const {submittedContactInfo} = state;
    return submittedContactInfo;
  },
  uploadedFile(state): boolean {
    const {uploadedFile} = state;
    return uploadedFile;
  }
};

export default getters;

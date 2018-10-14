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
  loginError(state): string {
    const { loginError } = state;
    return loginError;
  },
  forgotPasswordStatus(state): string {
    const { forgotPasswordStatus } = state;
    return forgotPasswordStatus;
  },
  forgotPasswordError(state): string {
    const { forgotPasswordError } = state;
    return forgotPasswordError;
  },
  confirmPasswordStatus(state): string {
    const { confirmPasswordStatus } = state;
    return confirmPasswordStatus;
  },
  confirmPasswordError(state): string {
    const { confirmPasswordError } = state;
    return confirmPasswordError;
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

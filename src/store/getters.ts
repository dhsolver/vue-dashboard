import { GetterTree } from 'vuex';
import { State } from './state';

// State , RootState
const getters: GetterTree<State, State> = {
  isLoggedIn(state): boolean {
    const { isLoggedIn } = state;
    return isLoggedIn;
  },
  submittedContactInfo(state): boolean {
    const { submittedContactInfo } = state;
    return submittedContactInfo;
  },
  uploadedFile(state): boolean {
    const { uploadedFile } = state;
    return uploadedFile;
  }
};

export default getters;

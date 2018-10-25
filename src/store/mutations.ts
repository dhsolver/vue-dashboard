import Vue from 'vue';
import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

declare function clearStorage();

const mutations: MutationTree<State> = {
  // LOGIN_USER
  [MutationTypes.LOGIN_USER_SUCCESS]: (state: State) => {
    state.isLoggedIn = true;
  },
  // LOGOUT_USER
  [MutationTypes.LOGOUT_USER_REQUEST]: (state: State) => {
    clearStorage();
    state.isLoggedIn = false;
  },
  // SUBMIT_CONTACT_INFO
  [MutationTypes.SUBMIT_CONTACT_INFO_REQUEST]: (state: State) => {
    state.submittedContactInfo = true;
  },
  // UPLOAD_FILE
  [MutationTypes.UPLOAD_FILE_REQUEST]: (state: State) => {
    state.uploadedFile = true;
  },
};

export default mutations;

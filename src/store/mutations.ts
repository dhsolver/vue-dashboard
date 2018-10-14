import Vue from 'vue';
import {MutationTree} from 'vuex';
import {MutationTypes} from './mutation-types';
import {State} from './state';

declare var localStorage;
declare function  initializeStorage ();


const mutations: MutationTree<State> = {

  [MutationTypes.LOGIN_SUCCEEDED]: (state: State) => {
    state.loginStorage = localStorage;
    const configString = localStorage.getItem('awsConfig');
    const config = JSON.parse(configString);
    state.loggedIn = config != null;
    console.log('loginChanged', state.loginStorage)
  },
  [MutationTypes.LOGOUT_USER]: (state: State) => {
    localStorage.clear();
    initializeStorage();
    state.loggedIn = false;
    state.loginStorage = localStorage;
    console.log('logout user', state.loginStorage)
  },
  [MutationTypes.SUBMIT_CONTACT_INFO]: (state: State) => {
    state.submittedContactInfo = true;
  },
  [MutationTypes.UPLOAD_FILE]: (state: State) => {
    console.log('uploaded file');
    state.uploadedFile = true;
  },
  [MutationTypes.LOGIN_REQUESTED]: (state: State) => {
    state.loginError = '';
  },
  [MutationTypes.LOGIN_FAILED]: (state: State, payload) => {
    state.loginError = payload;
  },
  // FORGOT_PASSWORD
  [MutationTypes.FORGOT_PASSWORD_REQUEST]: (state: State) => {
    state.forgotPasswordStatus = 'REQUESTED';
    state.forgotPasswordError = '';
  },
  [MutationTypes.FORGOT_PASSWORD_SUCCEEDED]: (state: State) => {
    state.forgotPasswordStatus = 'SUCCEEDED';
  },
  [MutationTypes.FORGOT_PASSWORD_FAILED]: (state: State, payload) => {
    state.forgotPasswordStatus = 'FAILED';
    state.forgotPasswordError = payload;
  },
  // CONFIRM_PASSWORD
  [MutationTypes.CONFIRM_PASSWORD_REQUEST]: (state: State) => {
    state.confirmPasswordStatus = 'REQUESTED';
    state.confirmPasswordError = '';
  },
  [MutationTypes.CONFIRM_PASSWORD_SUCCEEDED]: (state: State) => {
    state.confirmPasswordStatus = 'SUCCEEDED';
  },
  [MutationTypes.CONFIRM_PASSWORD_FAILED]: (state: State, payload) => {
    state.confirmPasswordStatus = 'FAILED';
    state.confirmPasswordError = payload;
  },
};

export default mutations;

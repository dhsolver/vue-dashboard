import Vue from 'vue';
import {MutationTree} from 'vuex';
import {MutationTypes} from './mutation-types';
import {State} from './state';

declare var localStorage;
declare function  initializeStorage ();


const mutations: MutationTree<State> = {
  [MutationTypes.LOGIN_REQUESTED]: (state: State) => {
    state.loggedIn = false;
    state.loginError = '';
  },
  [MutationTypes.LOGIN_SUCCEEDED]: (state: State) => {
    state.loginStorage = localStorage;
    const config = JSON.parse(localStorage.getItem('awsConfig'));
    state.loggedIn = config != null;
    console.log('loginChanged', state.loginStorage)
  },
  [MutationTypes.LOGIN_FAILED]: (state: State, payload) => {
    state.loginError = payload;
  },
  [MutationTypes.LOGOUT_USER]: (state: State) => {
    const firstLogin = localStorage.getItem('firstLogin');

    // Keep X,Y values whenever localstorage is cleared.
    const adopt_curve_x = localStorage.getItem('adopt_curve_x');
    const adopt_curve_y = localStorage.getItem('adopt_curve_y');
    const adopt_curve_limit = localStorage.getItem('adopt_curve_limit');
    const influencers_x = localStorage.getItem('influencers_x');
    const influencers_y = localStorage.getItem('influencers_y');
    const influencers_limit = localStorage.getItem('influencers_limit');

    localStorage.clear();
    if (firstLogin === 'no') localStorage.setItem('firstLogin', 'no');
    if (adopt_curve_x) localStorage.setItem('adopt_curve_x', adopt_curve_x);
    if (adopt_curve_y) localStorage.setItem('adopt_curve_y', adopt_curve_y);
    if (adopt_curve_limit) localStorage.setItem('adopt_curve_y', adopt_curve_limit);
    if (influencers_x) localStorage.setItem('influencers_x', influencers_x);
    if (influencers_y) localStorage.setItem('influencers_y', influencers_y);
    if (influencers_limit) localStorage.setItem('influencers_y', influencers_limit);
    
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

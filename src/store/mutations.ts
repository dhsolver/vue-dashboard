import Vue from 'vue';
import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

declare function initializeStorage();

const mutations: MutationTree<State> = {
  // LOGIN_USER
  [MutationTypes.LOGIN_USER_SUCCESS]: (state: State) => {
    state.isLoggedIn = true;
  },
  // LOGOUT_USER
  [MutationTypes.LOGOUT_USER_REQUEST]: (state: State) => {
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

import {ActionTree} from 'vuex';
import {MutationTypes} from './mutation-types';
import {State} from './state';
import { sendPost } from '../api/api';

declare function loginUser(email, pwd): any;
declare function registeringRequest (email, password, firstName, lastName, company);
declare function registeringWithCode (code);
declare function forgotPassword(username): any;
declare function confirmPassword(username, code, newPassword): any;
declare function uploadFile(file);


const actions: ActionTree<State, State> = {
  // LOGIN_USER
  [MutationTypes.LOGIN_USER_REQUEST]: ({ commit }, payload) => {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    if (awsConfig === null) {
      return new Promise((resolve) => {
        loginUser(payload.username, payload.password)
          .then(() => {
            commit(MutationTypes.LOGIN_USER_SUCCESS);
            resolve({ status: 'ok' });
          }).catch(err => {
            resolve({ status: 'error', msg: err.message })
          });
      });
    }
  },
  // LOGOUT_USER
  [MutationTypes.LOGOUT_USER_REQUEST]: ({ commit }) => {
    commit(MutationTypes.LOGOUT_USER_REQUEST);
  },
  // REGISTER_UESR
  [MutationTypes.REGISTER_USER_REQUEST]: ({ commit }, payload) => {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    if (awsConfig === null) {
      return new Promise((resolve) => {
        registeringRequest(payload.email, payload.password, payload.firstName, payload.lastName, payload.company)
          .then(() => {
            resolve({ status: 'ok' });
          }).catch(err => {
            const msgs = err.message.split(':');
            resolve({ status: 'error', msg: msgs[msgs.length - 1] });
          });
      });
    }
  },
  // CONFIRM_USER
  [MutationTypes.CONFIRM_USER_REQUEST]: ({ commit }, payload) => {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    if (awsConfig === null) {
      return new Promise((resolve) => {
        registeringWithCode(payload.code)
          .then(() => {
            resolve({ status: 'ok' });
          }).catch(err => {
            resolve({ status: 'error', msg: err });
          });
      });
    }
  },
  // GET_COMPANY_NAME
  [MutationTypes.GET_COMPANY_NAME_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/get_company_name', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          resolve({ status: 'error', msg: err.message });
        });
    });
  },
  // CREATE_ACCOUNT
  [MutationTypes.CREATE_ACCOUNT_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/create_account', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          resolve({ status: 'error', msg: err.message });
        });
    });
  },
  // GET_CLIENT_NAME
  [MutationTypes.GET_CLIENT_NAME_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/get_client_name', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((err: any) => {
          resolve({ status: 'error', msg: err.message });
        });
    });
  },
  // FORGOT_PASSWORD
  [MutationTypes.FORGOT_PASSWORD_REQUEST]: ({ commit }, payload) => {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    if (awsConfig === null) {
      return new Promise((resolve) => {
        forgotPassword(payload.username)
          .then(() => {
            resolve({ status: 'ok' });
          }).catch(err => {
            resolve({ status: 'error', msg: err.message });
          });
      });
    }
  },
  // CONFIRM_PASSWORD
  [MutationTypes.CONFIRM_PASSWORD_REQUEST]: ({ commit }, payload) => {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    if (awsConfig === null) {
      return new Promise((resolve) => {
        confirmPassword(payload.username, payload.code, payload.newPassword)
          .then(() => {
            resolve({ status: 'ok' });
          }).catch(err => {
            resolve({ status: 'error', msg: err.message });
          });
      });
    }
  },

  [MutationTypes.SUBMIT_CONTACT_INFO_REQUEST]: ({commit}, contactInfo) => {
    // contactInfo = {"first_name": "Dave", "last_name": "Smith", "company_name": "Wrench.AI Test sssss 1", "phone_number": "888-555-1212", "email": "kevin@wrench.ai", "street_1": "555 Main St.", "street_2": "Apt 2B", "city": "Los Angeles", "state": "CA", "zip": "91203", "year": "1970", "month": "01", "day": "21"};
    sendPost('/contact_info', contactInfo,
      {
      'Content-Type': 'application/json',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'origin, x-requested',
      'Access-Control-Request-Origin': 'https://foo.bar.org' })
    .then((res: any) => {
      console.log(res)
      commit(MutationTypes.SUBMIT_CONTACT_INFO_REQUEST);
    })
    .catch((error: any) => {
      if (error.response && error.response.data) {
        console.log(error.response.data)
      } else {
        console.log(error.message)
      }
    })
  },

  [MutationTypes.GET_CONTACT_INFO_REQUEST]: ({ commit }, {callback}) => {
    // contactInfo = {"first_name": "Dave", "last_name": "Smith", "company_name": "Wrench.AI Test sssss 1", "phone_number": "888-555-1212", "email": "kevin@wrench.ai", "street_1": "555 Main St.", "street_2": "Apt 2B", "city": "Los Angeles", "state": "CA", "zip": "91203", "year": "1970", "month": "01", "day": "21"};
    sendPost('/get_contact_info', {},
      {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'origin, x-requested',
        'Access-Control-Request-Origin': 'https://foo.bar.org'
      })
      .then((res: any) => {
        if (callback) {
          callback(res.data.payload);
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.data) {
          console.log(error.response.data)
        } else {
          console.log(error.message)
        }
      })
  },
  // GET_PERSON_INFO
  [MutationTypes.GET_PERSON_INFO_REQUEST]: ({ commit }, payload) => {
    // contactInfo = {"first_name": "Dave", "last_name": "Smith", "company_name": "Wrench.AI Test sssss 1", "phone_number": "888-555-1212", "email": "kevin@wrench.ai", "street_1": "555 Main St.", "street_2": "Apt 2B", "city": "Los Angeles", "state": "CA", "zip": "91203", "year": "1970", "month": "01", "day": "21"};
    return new Promise((resolve) => {
      sendPost('/get_person_info', payload)
        .then((res: any) => {
          resolve({ status: 'ok', data: res.data.payload });
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },


  [MutationTypes.GET_CORPORA_REQUEST]: ({ commit }, {payload, callback}) => {
    sendPost('/get_corpora', {})
      .then((res: any) => {
        if (callback) {
          if (res.data === undefined) {
            callback({
              status: 'error',
              data: {},
            });
          }
          else {
            callback({
              status: 'success',
              data: res.data.payload,
            });
          }
        }
      })
      .catch((error: any) => {
        callback({
          status: 'error',
          msg: 'failed to fetch corpora',
        });
      })
  },

  [MutationTypes.GET_CLIENT_FILE_FILTERS_REQUEST]: ({ commit }, {payload, callback}) => {
    sendPost('/client_file_filters', {})
      .then((res: any) => {
        callback({
          status: 'ok',
          data: res.data.payload
        });
      })
      .catch((error: any) => {
        callback({
          status: 'error',
          msg: 'Failed to fetch filters'
        });
      });
  },

  [MutationTypes.UPLOAD_FILE_REQUEST]: ({commit}, { file, callback}) => {
    console.log('********* file upload action ********');
    uploadFile(file).then(data => {
      console.log('*** done ***', data);
      commit(MutationTypes.UPLOAD_FILE_REQUEST);
      callback({
        status: 'ok',
        data: data
      });
      commit(MutationTypes.UPLOAD_FILE_REQUEST);
    }).catch(error => {
      console.log('*** error ***', error);
      callback({
        status: 'error',
        msg: error
      });
    });
  },


  [MutationTypes.CREATE_CORPUS_REQUEST]: ({ commit }, {payload, callback}) => {
    sendPost('/create_corpus', payload)
      .then((res: any) => {
        callback(res.data);
      })
      .catch((error: any) => {
        callback({
          status: 'error',
          msg: 'Failed to create campaign',
        });
      });
  },

  [MutationTypes.GET_TOP_LINE_REQUEST]: ({ commit }, { payload, callback }) => {
    sendPost('/top_line', payload)
      .then((res: any) => {
        if (callback) {
          if (res.data === undefined) {
            callback({
              status: 'error',
              data: {},
            });
          }
          else {
            callback({
              status: 'success',
              data: res.data,
            });
          }
        }
      })
      .catch((error: any) => {
        callback({
          status: 'error',
          msg: 'Failed to get'
        });
      });
  },
  // EXPORT_CONTACTS
  [MutationTypes.EXPORT_CONTACTS_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/export_contacts', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },
  // EXPORT_CONTACTS_CAMPAIGN_RECOMMENDATION
  [MutationTypes.EXPORT_CONTACTS_CAMPAIGN_RECOMMENDATION_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/export_contacts_campaign_recomendation', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },

  // CAMPAIGN_RECOMMENDATION
  [MutationTypes.GET_CAMPAIGN_RECOMMENDATION]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/campaign_recommendation', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },

  // GET_BILLING_INFO
  [MutationTypes.GET_BILLING_INFO_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/billing', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },
  // STRIPE_CHECKOUT
  [MutationTypes.STRIPE_CHECKOUT_REQUEST]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      sendPost('/stripe', payload)
        .then((res: any) => {
          resolve(res.data);
        }).catch((error: any) => {
          resolve({ status: 'error', msg: error.message });
        });
    });
  },

  [MutationTypes.UPDATE_PERSON_INFO_REQUEST]: ({ commit }, { payload, callback}) => {
    sendPost('/update_person_info', payload)
      .then((res: any) => {
        callback({
          status: 'ok',
        });
      })
      .catch((error: any) => {
        callback({
          status: 'error',
          msg: 'Failed to update.'
        });
      });
  }
};

export default actions;

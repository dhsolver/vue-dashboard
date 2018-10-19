import axios from 'axios'

declare var localStorage;
declare function initializeStorage ();
declare function refreshAWSCredentials(callback): any;

let baseUrl = 'https://rw3gl2g6ff.execute-api.us-east-1.amazonaws.com/dev';
let config = {
  address: baseUrl,
  port: '',
  basePath: '',
  axiosConfig: {
    baseURL: baseUrl,
    headers: {},
    withCredentials: false,
    crossDomain: true,
  },
  getEndpointUrl () {
    return this.address + (this.basePath ? this.basePath : '')
  }
}
let $http = axios.create(config.axiosConfig)

$http.interceptors.request.use((config) => {
  const sessionTokens = JSON.parse(localStorage.getItem('sessionTokens'));
  if (sessionTokens) {
    const idTokenExp = sessionTokens['IdToken']['payload']['exp'];
    const currentTime = new Date().valueOf();
    // Check if token is expired, refresh token
    if (currentTime / 1000 > idTokenExp) {
      const firstLogin = localStorage.getItem('firstLogin');
      localStorage.clear();
      if (firstLogin === 'no') localStorage.setItem('firstLogin', 'no');
      initializeStorage();
      window.location.href = '/';
      return;
    }
    config.headers['authorization'] = 'Bearer ' +  sessionTokens['IdToken']['jwtToken'];
  }
  return config;
}, (error) => {
    return Promise.reject(error);
});

$http.interceptors.response.use((response) => {
  refreshAWSCredentials(() => {});
  return response;
}, (error) => {
  refreshAWSCredentials(() => {});
  return Promise.reject(error);
});

let convertObjectToFormData = (items) => {
  const formData = new FormData();
  for (let key in items) {
    formData.append(key, items[key])
  }
  return formData
}

let convertObjectToUrlData = (items) => {
  const params = new URLSearchParams();
  for (let key in items) {
    if (items[key]) {
      params.append(key, items[key])
    }
  }
  return params
}

let sendPostForm = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.post(url, convertObjectToFormData(payload))
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPost = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.post(url, payload)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPatchForm = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.patch(url, convertObjectToUrlData(payload), headers)
      .then((handleSuccess) => {
        resolve(handleSuccess.data)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPatch = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.patch(url, payload, headers)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendPut = (url, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    $http.put(url, payload, headers)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

let sendGet = (url, headers = null) => {
  let pageCount = null
  return new Promise((resolve, reject) => {
    $http.get(url, config.axiosConfig)
      .then((handleSuccess) => {
        resolve(handleSuccess)
      })
      .catch((handleError) => {
        reject(handleError)
      })
  })
}

// let sendDelete = (url, payload, headers = null) => {
//   return new Promise((resolve, reject) => {
//     $http.delete(url, payload, headers)
//       .then((handleSuccess) => {
//         resolve(handleSuccess)
//       })
//       .catch((handleError) => {
//         reject(handleError)
//       })
//   })
// }

export default config

export { config }

export { sendPost }

export { sendPostForm }

export { sendGet }

export { sendPatch }

export { sendPut }

export { sendPatchForm }

// export { sendDelete }

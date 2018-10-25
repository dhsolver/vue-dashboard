var mysfitsApiEndpoint = 'https://f3mgdwkge9.execute-api.us-east-1.amazonaws.com/prod'; // example: 'https://abcd12345.execute-api.us-east-1.amazonaws.com/prod'
var streamingApiEndpoint = 'https://ep9kc2glh5.execute-api.us-east-1.amazonaws.com/prod'; // example: 'https://abcd12345.execute-api.us-east-1.amazonaws.com/prod'

var cognitoUserPoolId = 'us-east-1_XG9JMRGxm';  // example: 'us-east-1_abcd12345'
var cognitoUserPoolClientId = '2btjskfmptccs5uoq80l2kd1uh'; // example: 'abcd12345abcd12345abcd12345'
var awsRegion = 'us-east-1'; // example: 'us-east-1' or 'eu-west-1' etc.

initializeStorage();

var configString = localStorage.getItem("awsConfig");
var config = JSON.parse(configString);
if(config != null) {
  refreshAWSCredentials();
}

// function refreshAWSCredentials() {
//   var userPoolId = localStorage.getItem('userPoolId');
//   var clientId = localStorage.getItem('clientId');
//   var identityPoolId = localStorage.getItem('identityPoolId');
//   var loginPrefix = localStorage.getItem('loginPrefix');

//   var poolData = {
//     UserPoolId : userPoolId, // Your user pool id here
//     ClientId : clientId // Your client id here
//   };
//   var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//   var cognitoUser = userPool.getCurrentUser();

//   if (cognitoUser != null) {
//     cognitoUser.getSession(function(err, result) {
//       if (result) {
//         console.log('You are now logged in.');
//         cognitoUser.refreshSession(result.getRefreshToken(), function(err, result) {

//           if (err) {//throw err;
//             console.log('In the err: '+err);
//           }
//           else{
//             localStorage.setItem('awsConfig', JSON.stringify(AWS.config));
//             var sessionTokens =
//             {
//               IdToken: result.getIdToken(),
//               AccessToken: result.getAccessToken(),
//               RefreshToken: result.getRefreshToken()
//             };
//             document.getElementById('login_state').click();

//           }
//         });

//       }
//     });
//   }
// }

function initializeStorage() {
  var identityPoolId = cognitoUserPoolId;//
  var userPoolId = cognitoUserPoolId; //
  var clientId = cognitoUserPoolClientId;//
  var loginPrefix = 'cognito-idp.' + awsRegion + '.amazonaws.com/' + identityPoolId;

  localStorage.setItem('identityPoolId', identityPoolId);
  localStorage.setItem('userPoolId', userPoolId);
  localStorage.setItem('clientId', clientId);
  localStorage.setItem('loginPrefix', loginPrefix);
}

function clearStorage() {
  var firstLogin = localStorage.getItem('firstLogin');

  // Keep X,Y values whenever localstorage is cleared.
  var adopt_curve_x = localStorage.getItem('adopt_curve_x');
  var adopt_curve_y = localStorage.getItem('adopt_curve_y');
  var adopt_curve_limit = localStorage.getItem('adopt_curve_limit');
  var influencers_x = localStorage.getItem('influencers_x');
  var influencers_y = localStorage.getItem('influencers_y');
  var influencers_limit = localStorage.getItem('influencers_limit');

  localStorage.clear();
  if (firstLogin === 'no') localStorage.setItem('firstLogin', 'no');
  if (adopt_curve_x) localStorage.setItem('adopt_curve_x', adopt_curve_x);
  if (adopt_curve_y) localStorage.setItem('adopt_curve_y', adopt_curve_y);
  if (adopt_curve_limit) localStorage.setItem('adopt_curve_y', adopt_curve_limit);
  if (influencers_x) localStorage.setItem('influencers_x', influencers_x);
  if (influencers_y) localStorage.setItem('influencers_y', influencers_y);
  if (influencers_limit) localStorage.setItem('influencers_y', influencers_limit);
  
  initializeStorage();
}

function loginUser(email, pwd) {
  return new Promise(function(resolve, reject) {
    var userPoolId = localStorage.getItem('userPoolId');
    var clientId = localStorage.getItem('clientId');
    var identityPoolId = localStorage.getItem('identityPoolId');
    var loginPrefix = localStorage.getItem('loginPrefix');

    var poolData = {
      UserPoolId : userPoolId, // Your user pool id here
      ClientId : clientId // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var authenticationData =
    {
      'Username': email,
      'Password': pwd
    }
    var userData = {
      Username : email,
      Pool : userPool
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + \n' + result.getAccessToken().getJwtToken());
        var sessionTokens =
        {
          IdToken: result.getIdToken(),
          AccessToken: result.getAccessToken(),
          RefreshToken: result.getRefreshToken()
        };
        localStorage.setItem('sessionTokens', JSON.stringify(sessionTokens));
        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : identityPoolId, // your identity pool id here
          Logins : {
            // Change the key below according to the specific region your user pool is in.
            loginPrefix : sessionTokens.IdToken.jwtToken
          }
        });
        localStorage.setItem('awsConfig', JSON.stringify(AWS.config));
        localStorage.setItem('email', email);
        resolve();
      },
      onFailure: function(err) {
        reject(err);
      },
    });
  });
}


function refreshAWSCredentials(callback) {

  var userPoolId = localStorage.getItem('userPoolId');
  var clientId = localStorage.getItem('clientId');
  var identityPoolId = localStorage.getItem('identityPoolId');
  var loginPrefix = localStorage.getItem('loginPrefix');

  var poolData = {
    UserPoolId : userPoolId, // Your user pool id here
    ClientId : clientId // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
        cognitoUser.getSession(function(err, result) {
            if (result) {
                console.log('You are now logged in.');
                cognitoUser.refreshSession(result.getRefreshToken(), function(err, result) {

                    if (err) {//throw err;
                        console.log('In the err: '+err);
                    }
                    else{
                        localStorage.setItem('awsConfig', JSON.stringify(AWS.config));
                        var sessionTokens =
                        {
                          IdToken: result.getIdToken(),
                          AccessToken: result.getAccessToken(),
                          RefreshToken: result.getRefreshToken()
                        };
                        localStorage.setItem("sessionTokens", JSON.stringify(sessionTokens));
                        if (typeof callback === 'function') callback();
                    }
                });

            }
        });
    }


}

function uploadFile(file) {
  return new Promise(function(resolve, reject) {
    var userPoolId = localStorage.getItem('userPoolId');
    var clientId = localStorage.getItem('clientId');
    var identityPoolId = localStorage.getItem('identityPoolId');
    var loginPrefix = localStorage.getItem('loginPrefix');

    var poolData = {
      UserPoolId : userPoolId, // Your user pool id here
      ClientId : clientId // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    var tokenInfo = {};
    if (localStorage.getItem('sessionTokens')) {
      tokenInfo = JSON.parse(localStorage.getItem('sessionTokens'))
    }

    // Set the region where your identity pool exists (us-east-1, eu-west-1)
    AWS.config.region = 'us-east-1';

    // Configure the credentials provider to use your identity pool
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:4baee7b3-4ea4-45a6-aeab-b2eac550a143',
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_XG9JMRGxm': tokenInfo['IdToken']['jwtToken'],
        }
    });

    // Make the call to obtain credentials
    AWS.config.credentials.get(function(){
        var s3bucket = new AWS.S3();
        longFileName = tokenInfo['IdToken']['payload']['email'] + ' || ' + tokenInfo['IdToken']['payload']['sub'] + ' || ' + file.name;
        const obj = {
          Key: longFileName,
          Bucket: 'enrichment-file-drop-wrench-ai',
          Body: file,
          ContentType: file.type
        };
        s3bucket.upload(obj).on('httpUploadProgress', function(evt) {
        }).send(function(err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    });
  });
}


function getSubjectId() {
  if (localStorage.getItem('sessionTokens')) {
    const tokenInfo = JSON.parse(localStorage.getItem('sessionTokens'));
    sub_id = tokenInfo['IdToken']['payload']['sub'];
    return sub_id;
  }
  else {
    return 'log in token not found';
  }
}

function registeringRequest (email, pw, fname, lname, company) {

  var poolData = {
    UserPoolId : cognitoUserPoolId,
    ClientId : cognitoUserPoolClientId
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
      Name : 'email',
      Value : email
  };

  var dataFirstName = {
    Name : 'given_name',
    Value : fname
  };

  var dataLastName = {
    Name : 'family_name',
    Value : lname
  };

  var dataCompany = {
    Name: 'middle_name',
    Value: company
  }

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributeFirstName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFirstName);
  var attributeLastName = new AmazonCognitoIdentity.CognitoUserAttribute(dataLastName);
  var attributeCompany = new AmazonCognitoIdentity.CognitoUserAttribute(dataCompany);

  attributeList.push(attributeEmail);
  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeCompany);

  return new Promise(function(resolve, reject) {
    userPool.signUp(email, pw, attributeList, null, function(err, result){
      if (err) {
        reject(err);
      } else {
        cognitoUser = result.user;
        console.log(cognitoUser);
        localStorage.setItem('email', email);
        resolve();
      }
    });
  })
}

function registeringWithCode(confirmCode){
  return new Promise(function(resolve, reject) {
    console.log('start registeringWithCode()')

    var poolData = {
      UserPoolId : cognitoUserPoolId,
      ClientId : cognitoUserPoolClientId
    };

    var userName = localStorage.getItem('email');

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : userName,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(confirmCode, true, function(err, result) {
      console.log('***********', err, result);
      if (result == 'SUCCESS') {
        resolve();
      }
      else if (err) {
        reject(err.message);
      }
    });
  });
}

function forgotPassword (username) {
  return new Promise(function(resolve, reject) {
    var userPoolId = localStorage.getItem('userPoolId');
    var clientId = localStorage.getItem('clientId');

    var poolData = {
      UserPoolId : userPoolId, // Your user pool id here
      ClientId : clientId // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username : username,
      Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.forgotPassword({
      onFailure: function(err) {
        reject(err);
      },
      inputVerificationCode: function() {
        resolve();
      }
    });
  });
}

function confirmPassword (username, code, newPassword) {
  return new Promise(function(resolve, reject) {
    var userPoolId = localStorage.getItem('userPoolId');
    var clientId = localStorage.getItem('clientId');

    var poolData = {
      UserPoolId : userPoolId, // Your user pool id here
      ClientId : clientId // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username : username,
      Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: function () {
        resolve();
      },
      onFailure: function(err) {
        reject(err);
      }
    });
  });
}

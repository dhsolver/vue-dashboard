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

function refreshAWSCredentials() {
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
            document.getElementById('login_state').click();

          }
        });

      }
    });
  }
}

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

function loginUser(email, pwd) {
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

      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        for (i = 0; i < result.length; i++) {
            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
            if (result[i].getName() == 'sub') {
              console.log('Overwriting userId into local storage');
              localStorage.setItem('userId', result[i].getValue());
            }
        }
        document.getElementById('login_state').click();
      });



    },

    onFailure: function(err) {
      alert(err.message);
    },

  });
}


function refreshAWSCredentials() {

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

                    }
                });

            }
        });
    }


}

function uploadFile(file) {
  return new Promise((resolve, reject) => {
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

    let tokenInfo = {};
    if (localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens')) {
      tokenInfo = JSON.parse(localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens'))
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
        s3bucket.upload(obj).on('httpUploadProgress', (evt) => {
        }).send((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    });
  });
}


function getSubjectId() {
  if (localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens')) {
    const tokenInfo = JSON.parse(localStorage.getItem('sessionTokens') || sessionStorage.getItem('sessionTokens'));
    sub_id = tokenInfo['IdToken']['payload']['sub'];
    return sub_id;
  }
  else {
    return 'log in token not found';
  }
}

function registeringRequest (email, pw) {
  event.preventDefault();

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

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(email, pw, attributeList, null, function(err, result){
      if (err) {
          alert(err.message);
          return;
      }
      cognitoUser = result.user;
      console.log(cognitoUser);
      localStorage.setItem('email', email);
      document.getElementById('registering_request_sent').click();
  });


}

function registeringWithCode(confirmCode){
  console.log('start registeringWithCode()')

  event.preventDefault();

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
      if (err) {
        if (err.code == 'UnknownError') {
          alert('success!');
          location.href="/form"
        } else {
          alert(err.message);
          console.log(err)
          return;
        }
      }

  });

}

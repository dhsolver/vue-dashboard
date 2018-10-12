declare var localStorage;



export class State {
  /* form */
  public loginStorage: any;
  public loggedIn: boolean;
  public loginError: string;
  public submittedContactInfo: boolean;
  public uploadedFile: boolean;

  constructor() {
    this.loginStorage = localStorage;
    const configString = localStorage.getItem('awsConfig');
    const config = JSON.parse(configString);
    this.loggedIn = config != null;
    this.submittedContactInfo = false;
    this.uploadedFile = false;
    this.loginError = '';
  }
}

const state = new State();
export default state;

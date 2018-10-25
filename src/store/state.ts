export class State {
  /* form */
  public isLoggedIn: boolean;
  public submittedContactInfo: boolean;
  public uploadedFile: boolean;

  constructor() {
    const awsConfig = JSON.parse(localStorage.getItem('awsConfig'));
    this.isLoggedIn = awsConfig !== null;
    this.submittedContactInfo = false;
    this.uploadedFile = false;
  }
}

const state = new State();
export default state;

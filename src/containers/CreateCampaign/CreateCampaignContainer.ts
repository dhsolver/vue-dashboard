import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { MutationTypes } from '../../store/mutation-types';

import './styles.scss';

@Component({
  template: require('./CreateCampaign.html'),
  components: {
  }
})

export class CreateCampaignContainer extends Vue {
  clientName: string = '';
  campaignName: string = '';
  campaignNameValidated: boolean = true;
  type: string = 'person';
  description: string = '';
  descriptionValidated: boolean = true;
  status: string = '';
  message: string = '';
  error: string = '';
  uploading: boolean = false;

  mounted() {
    // Get personinfo from localstorage to get client name
    const personInfo = JSON.parse(localStorage.getItem('personInfo'));
    this.clientName = personInfo.company_name;
  }

  createCampaign() {
    this.uploading = true;
    this.campaignNameValidated = !!this.campaignName;
    this.descriptionValidated = !!this.campaignName;
    if (this.campaignNameValidated && this.descriptionValidated) {
      const campaignData = { campaign_name: this.campaignName, type: this.type, description: this.description };
      this.$store.dispatch(MutationTypes.CREATE_CORPUS_REQUEST, { payload: campaignData, callback: (res) => {
        this.status = res.status;
        if (res.status === 'ok') {
          this.message = 'Your campaign has been saved. You can create additional campaigns, or proceed to uploading your contacts ';
          this.campaignName = '';
          this.description = '';
        } else {
          this.error = res.msg;
        }
        this.uploading = false;
      }});
    }
  }
}

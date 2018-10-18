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

  mounted() {
    this.clientName = localStorage.getItem('clientName');
  }

  createCampaign() {
    this.campaignNameValidated = !!this.campaignName;
    this.descriptionValidated = !!this.campaignName;
    if (this.campaignNameValidated && this.descriptionValidated) {
      const campaignData = { campaign_name: this.campaignName, type: this.type, description: this.description };
      this.$store.dispatch(MutationTypes.CREATE_CORPUS_REQUEST, { payload: campaignData, callback: (res) => {
        this.status = res.status;
        if (res.status === 'ok') {
          this.message = 'Campaign has been successfully created.';
          this.campaignName = '';
          this.description = '';
          setTimeout(() => {
            this.status = '';
          }, 1000);
        } else {
          this.error = res.msg;
        }
      }});
    }
  }
}

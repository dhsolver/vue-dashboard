import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { MutationTypes } from '../../store/mutation-types';

import './styles.scss';

declare function getSubjectId();

@Component({
  template: require('./CampaignRecommendation.html'),
  components: {
  },
  data: function() {
    return {
      subjectId: getSubjectId()
    };
  }
})

export class CampaignRecommendationContainer extends Vue {
  mounted() {
    // console.log(this.subjectId);
  }
}

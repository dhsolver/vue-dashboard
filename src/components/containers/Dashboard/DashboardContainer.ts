import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck);

declare function getSubjectId();

@Component({
  template: require('./dashboard.html'),
  components: {
    FontAwesomeIcon
  },
  data: function() {
     return {
       subjectId: getSubjectId()
     };
  },
})


export class DashboardContainer extends Vue {
}

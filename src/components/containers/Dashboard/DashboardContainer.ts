import Vue from 'vue';
import { Component} from 'vue-property-decorator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {MutationTypes} from '../../../store/mutation-types';

library.add(faCheck);

declare function getSubjectId();

@Component({
  template: require('./dashboard.html'),
  components: {
    FontAwesomeIcon
  },
  data: function() {
     return {
       subjectId: getSubjectId(),
       adopt_curve_x: '',
       adopt_curve_y: '',
       adopt_curve_x_options: [],
       adopt_curve_y_options: [],
     };
  },


  created() {
    this.$store.dispatch(MutationTypes.GET_CORPORA, { payload: {}, callback: res => {

        const client_corp_formated = [];
        res.data['client_corpora'].forEach(function(corpus) {
            const elem = {
              'value': corpus[0],
              'text': corpus[1],
            };
            client_corp_formated.push(elem);
        });

        const common_corp_formated = [];
        res.data['common_corpora'].forEach(function(corpus) {
            const elem = {
              'value': corpus[0],
              'text': corpus[1],
            };
            common_corp_formated.push(elem);
        });

        this.$data.adopt_curve_x_options = common_corp_formated;
        this.$data.adopt_curve_x = res.data['common_corpora'][0][0];

        this.$data.adopt_curve_y_options = client_corp_formated;
        this.$data.adopt_curve_y = res.data['client_corpora'][0][0];

    }});

  }

})


export class DashboardContainer extends Vue {
}

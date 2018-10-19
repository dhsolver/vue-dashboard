import Vue from 'vue';
import * as moment from 'moment';
import {MutationTypes} from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { StripeForm } from '../../components/StripeForm';

import './styles.scss';

@Component({
  template: require('./billing.html'),
  components: {
    StripeForm
  }
})

export class BillingContainer extends Vue {
  mode: string = process.env.ENV;
  
  get invoiceDate() {
    return moment().format('MMMM DD, YYYY');
  }

  payNow() {
    this.$checkout.open({
      name: `Wrench Monthly Billing!`,
      currency: 'USD',
      amount: 480 * 100,
      token: (token) => {
        // token.id
      }
    })
  }
}

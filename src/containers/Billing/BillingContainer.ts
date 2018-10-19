import Vue from 'vue';
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
  billingInfo: any = {};
  error: string = '';

  get total() {
    return ((this.billingInfo.enrich_line_total || 0) + (this.billingInfo.match_score_line_total || 0))
  }

  mounted() {
    this.$store.dispatch(MutationTypes.GET_BILLING_INFO, {
      payload: {},
      callback: (res) => {
        if (res.status === 'ok') {
          this.billingInfo = res.data.payload;
          this.error = '';
        } else {
          this.error = res.error;
        }
      }
    });
  }

  payNow() {
    this.$checkout.open({
      name: `Wrench Monthly Billing!`,
      currency: 'USD',
      amount: this.total * 100,
      token: (token) => {
        // token.id
      }
    })
  }
}

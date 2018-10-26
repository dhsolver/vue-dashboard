import Vue from 'vue';
import {MutationTypes} from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { LoadingIndicator } from '../../components/LoadingIndicator';

import './styles.scss';

@Component({
  template: require('./billing.html'),
  components: {
    LoadingIndicator,
  }
})
export class BillingContainer extends Vue {
  mode: string = process.env.ENV;
  billingInfo: any = {};
  error: string = '';
  isBusy: boolean = false;

  async mounted() {
    this.getBillingInfo();
  }

  async getBillingInfo() {
    this.isBusy = true;
    const getBillingInfoResponse = await this.$store.dispatch(MutationTypes.GET_BILLING_INFO_REQUEST, {});
    if (getBillingInfoResponse.status === 'error') {
      this.error = getBillingInfoResponse.msg;
      this.isBusy = false;
      return;
    }
    this.billingInfo = getBillingInfoResponse.payload;
    this.isBusy = false;
  }

  async stripeCheckout(token) {
    this.error = '';
    const stripeCheckoutResponse = await this.$store.dispatch(MutationTypes.STRIPE_CHECKOUT_REQUEST, {
      invoice_number: this.billingInfo.invoice_number,
      token
    });
    if (stripeCheckoutResponse.status === 'error') {
      this.error = stripeCheckoutResponse.msg;
      return;
    }
  }

  payNow() {
    this.$checkout.open({
      name: `Wrench Monthly Billing!`,
      currency: 'USD',
      amount: this.billingInfo.total_numeric,
      token: this.stripeCheckout
    })
  }
}

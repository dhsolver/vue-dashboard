import Vue from 'vue';
import {MutationTypes} from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'

import './styles.scss';

@Component({
  template: require('./billing.html'),
})

export class BillingContainer extends Vue {
  mode: string = process.env.ENV;
  billingInfo: any = {};
  error: string = '';

  mounted() {
    this.$store.dispatch(MutationTypes.GET_BILLING_INFO_REQUEST, {
      payload: {},
      callback: (res) => {
        if (res.status === 'ok') {
          this.billingInfo = res.data.payload;
          this.error = '';
        } else {
          this.error = res.error;
          this.billingInfo = {}
        }
      }
    });
  }

  payNow() {
    this.$checkout.open({
      name: `Wrench Monthly Billing!`,
      currency: 'USD',
      amount: this.billingInfo.total_numeric,
      token: (token) => {
        this.$store.dispatch(MutationTypes.STRIPE_CHECKOUT_REQUEST, {
          payload: {
            invoice_number: this.billingInfo.invoice_number,
            token,
          },
          callback: (res) => {
            if (res.status === 'ok') {
              this.error = '';
            } else {
              this.error = res.error;
            }
          }
        });
      }
    })
  }
}

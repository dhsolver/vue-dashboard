import Vue from 'vue';
import {MutationTypes} from '../../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { StripeForm } from '../../modules/StripeForm';




@Component({
  template: require('./stripe.html'),
  components: {
    StripeForm
  }
})


export class StripeContainer extends Vue {
  mode: string = process.env.ENV;
}

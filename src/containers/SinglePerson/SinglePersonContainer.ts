import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable'

import './styles.scss';

@Component({
  template: require('./SinglePerson.html'),
  components: {
    DataTable
  }
})

export class SinglePersonContainer extends Vue {
  
}
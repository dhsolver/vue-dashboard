import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
  template: require('./app.html'),
  components: {}
})
export class AppContainer extends Vue {


  mode: string = process.env.ENV;

}

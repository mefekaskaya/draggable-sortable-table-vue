import Vue from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAlphaDown,
  faSortAlphaDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import './app.css';

library.add(faSortAlphaDown);
library.add(faSortAlphaDownAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

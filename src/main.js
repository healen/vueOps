import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
Vue.config.productionTip = false;
import store from './store'
Vue.use(Vant);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

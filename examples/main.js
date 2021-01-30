import Vue from 'vue'
import App from './App.vue'
import KurisuCalendar from '../lib/'

Vue.config.productionTip = false
Vue.use(KurisuCalendar)

new Vue({
  render: h => h(App),
}).$mount('#app')
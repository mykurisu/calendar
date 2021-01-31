import Vue from 'vue'
import App from './App.vue'
import KurisuCalendar from '../lib/kurisuCalendar.umd'
import '../lib/kurisuCalendar.css'

Vue.config.productionTip = false
Vue.use(KurisuCalendar)

new Vue({
  render: h => h(App),
}).$mount('#app')
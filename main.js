import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')

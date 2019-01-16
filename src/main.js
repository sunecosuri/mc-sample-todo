import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false
// ここにfirebaseの各情報を貼る

//
firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

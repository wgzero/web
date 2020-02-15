import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import myPlugin from './lib/vuetools.js'
// import myPlugin from './lib/vuetools.js'

// Vue.use(myPlugin)
Vue.filter('getNumber', function(value){
  return value.filter((n) => {
    if(n % 2 === 0){
      return n;
    }
  })
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

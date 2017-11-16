import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Temperatur',
      component: require('./../components/Temperatur.vue').default
    }
  ]
})

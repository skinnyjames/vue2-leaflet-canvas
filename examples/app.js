import Vue from 'vue/dist/vue.common.js'
import App from './app.vue'
import 'leaflet/dist/leaflet.css'

new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})

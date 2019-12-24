import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'

import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

import App from './App.vue'
import router from './router'
import store from './store/index'

import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(VueChatScroll)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
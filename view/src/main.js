// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')

import { createApp } from "vue";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";

import Aura from "@primeuix/themes/aura";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.mount("#app");

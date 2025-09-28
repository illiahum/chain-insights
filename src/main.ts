import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.css";
import "./assets/css/sidebar.css";
import { createRouter, createWebHistory } from "vue-router";
import ResetPasswordComponent from "./components/pages/ResetPasswordComponent.vue";
import HomeComponent from "./components/pages/HomeComponent.vue";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', component: HomeComponent, name:'home'},
        { path: '/reset-password', component: ResetPasswordComponent, name:'reset-password'},
    ]
});

router.afterEach((to) => {
  document.body.className = "";

  if (to.name) {
    document.body.classList.add(`page-${to.name}`);
  }
});

const app = createApp(App);

app.use(pinia);
app.use(router)

app.mount("#app");

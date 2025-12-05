// Vue Portfolio - Application Entry Point
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './service/api';

const app = createApp(App);
// Use the centralized API instance instead of creating a new axios instance
app.config.globalProperties.$http = api; 
app.use(router);
app.mount('#app');
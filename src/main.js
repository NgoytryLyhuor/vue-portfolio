import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Set base URL based on current host
axios.defaults.baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:8000' : 'https://api.consatech-cambodia.com'; 

const app = createApp(App);
app.config.globalProperties.$http = axios; 
app.use(router);
app.mount('#app');
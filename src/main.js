import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import naive from 'naive-ui';
import 'naive-ui/dist/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 50000;

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router).use(naive).use(store);
app.mount('#app');

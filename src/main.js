import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'naive-ui/dist/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/';

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router);
app.mount('#app');

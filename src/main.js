import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import naive from 'naive-ui';
import 'naive-ui/dist/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL = 'http://43.138.14.231:8000/api';
axios.defaults.timeout = 50000;

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router).use(Antd).use(naive).use(store);
app.mount('#app');

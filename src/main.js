import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import naive from 'naive-ui';
import 'naive-ui/dist/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import 'animate.css';

axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router).use(Antd).use(naive).use(store);
app.mount('#app');

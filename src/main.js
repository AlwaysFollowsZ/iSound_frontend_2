import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import naive from 'naive-ui';
import 'naive-ui/dist/index';
import axios from 'axios';

<<<<<<< HEAD
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 50000;

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router).use(naive).use(store);
app.mount('#app');
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import 'naive-ui/dist/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(router).use(Antd).use(naive).use(store)

app.mount('#app')
>>>>>>> 3cc28530ce5c4d8fa3593c42598b2992fbec264f

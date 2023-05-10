
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import 'naive-ui/dist/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(router).use(Antd).use(naive)

app.mount('#app')

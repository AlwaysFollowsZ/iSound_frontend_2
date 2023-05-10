
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import 'naive-ui/dist/index';

const app = createApp(App)
app.use(router).use(naive)

app.mount('#app')

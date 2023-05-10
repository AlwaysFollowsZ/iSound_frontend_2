
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import 'naive-ui/dist/index'

const app = createApp(App)
app.use(router).use(naive).use(store)

app.mount('#app')

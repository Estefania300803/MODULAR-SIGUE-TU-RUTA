import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//estilos globales
import './assets/css/base.css'
import './assets/css/layout.css'
import './assets/css/theme.css'
import './assets/css/responsive.css'
import './assets/css/components.css'
import './assets/css/pages/home_page.css'
import './assets/css/pages/login_page.css'
import './assets/css/pages/mapa_page.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

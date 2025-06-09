import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Import Inter font
// import('@fontsource/inter/variable.css')
// Import Fira Code font
import('@fontsource/fira-code')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
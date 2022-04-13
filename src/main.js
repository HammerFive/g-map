import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

import tools from '../packages'

const app = createApp(App)

const components = tools.components
components.forEach(cpt => {
  app.component(cpt.name, cpt)
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.mount('#app')

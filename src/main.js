
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(router)
app.use(Notifications)

app.config.globalProperties.$session = {
    set(key, value)
    {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key)
    {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },
    remove(key)
    {
        localStorage.removeItem(key)
    },
    clear()
    {
        localStorage.clear()
    }
}

const token = app.config.globalProperties.$session.get('token') != undefined ? app.config.globalProperties.$session.get('token') : null;
axios.defaults.baseURL = "http://127.0.0.1:9090/api";
axios.defaults.headers.common['Authorization'] = token;

router.beforeEach((to, from, next) => {
    if(to.meta && to.meta.requireAuth) {
        if(token) {
            next();
        }else {
            next('/')
        }
    }else {
        next();
    }
})
app.mount('#app')

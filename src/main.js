
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(router)

axios.defaults.baseURL = "http://127.0.0.1:9090/api";

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

router.afterEach((to, from, next) => {
    // if()
});
app.mount('#app')

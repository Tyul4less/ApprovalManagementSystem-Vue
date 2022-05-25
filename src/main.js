
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import axios from 'axios';
import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import VueSidebar from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';


// Optional, since every component import their Bootstrap funcionality
// the following line is not necessary
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

//import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
//마운트가 무조건 마지막이어야함
app.use(router)
    .use(store)
    .use(BootstrapVue3)
    .use(BootstrapIconsPlugin)
    .use(VueSidebar)
    .use(VueSweetalert2)
    .mount('#app');


app.config.globalProperties.axios = axios.create({
 baseURL : 'http://localhost:9999'
});



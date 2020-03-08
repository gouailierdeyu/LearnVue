/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from 'vue-router'
import  myinfo from './components/myinfo'
import  myevent   from './components/myevent'
import  myjoin   from './components/myjoin'
import  mymess  from './components/mymess'
import  mypaper  from './components/mypaper'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'


Vue.prototype.axios=axios;
Vue.use(VueRouter);
const router=new VueRouter({
    routes: [
        {
            path:"/",redirect:"/myinfo"

        },{
            path:"/myinfo",component:myinfo,
        },{
            path:"/mypaper",component:mypaper,
        },{
            path:"/myjoin",component:myjoin,
        },{
            path:"/myevent",component:myevent,
        },{
            path:"/mymess",component:mymess,
        }
    ]
});
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app');

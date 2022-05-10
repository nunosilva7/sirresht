import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store"
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue"

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      requiresUserAuth: false,
    }
    
    
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta:{
      requiresUserAuth: true,
    }
  },
  {
    path: "/register",
    name: "Register",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next)=>{
  if(to.meta.requiresUserAuth === true){

    if(store.getters.isLoggedUser){
      next();
    }else{
      next("/")
    }
  }
  else{
    next()
  }

});

export default router;

import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {initializeApp} from "firebase/app"
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect)
Vue.config.productionTip = false;




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnLQABtVZerXPUDRvA9tkn21B23OQEz14",
  authDomain: "sirresht.firebaseapp.com",
  projectId: "sirresht",
  storageBucket: "sirresht.appspot.com",
  messagingSenderId: "632645429875",
  appId: "1:632645429875:web:6886e5a9824bd66985d806"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)





new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

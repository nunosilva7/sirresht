import Vue from "vue";
import Vuex from "vuex";

import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { MenuService } from "@/services/menu.service";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    users: [],
    nextMenu: {},
    loggedUserInformation: null,

    loggedUser: localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : null,
  },
  getters: {
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state =>
      state.loggedUser === null ? false : true,

    getLoggedUserInformation: state => state.loggedUserInformation,

    getNextMenu: state => state.nextMenu
    


  },

  actions: {

    async RetrieveLoggedUserInformation(context) {
      if (context.state.loggedUser !== null) {

        let data = await UserService.fetchUserById(
          context.state.loggedUser,
          context.state.loggedUser.userId
        );

        context.commit("LOGGED_USER_INFORMATION", data);
      }
    },

    async login(context, loginData) {
      let data = null;


      data = await AuthService.login(loginData.credentials);


      if (data !== null) {
        console.log("data" + data)
        context.commit("LOGIN", data);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify(context.state.loggedUser)
        );
        context.dispatch("RetrieveLoggedUserInformation");
      }
    },
    async logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("loggedUser");
    },
    async register(context, payload) {
      await AuthService.register(payload);
    },
    async getNextMenu(context) {
      let data = await MenuService.fetchNextMenu();
      console.log("data aa " + JSON.stringify(data));
      context.commit("GET_NEXT_MENU", data)

    }
  },
  mutations: {
    LOGIN(state, data) {
      state.loggedUser = data;
    },
    LOGOUT(state) {
      state.loggedUser = null;
      state.loggedUserInformation = null;
    },
    LOGGED_USER_INFORMATION(state, data) {
      state.loggedUserInformation = data;
    },
    GET_NEXT_MENU(state, data) {
      state.nextMenu = data
    }
  },
  modules: {},
});

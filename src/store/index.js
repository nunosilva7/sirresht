import Vue from "vue";
import Vuex from "vuex";

import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { MenuService } from "@/services/menu.service";
import { DishService } from "@/services/dish.service";
import { ReservationService } from "@/services/reservation.service";


Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    users: [],
    userById: {},
    menus: [],
    nextMenu: {},
    dishes: [],
    loggedUserInformation: localStorage.getItem("loggedUserInformation")
      ? JSON.parse(localStorage.getItem("loggedUserInformation"))
      : null,
    participantEmail: null,

    loggedUser: localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : null,
  },
  getters: {
    getLoggedUser: state => state.loggedUser,
    isLoggedUser: state =>
      state.loggedUser === null ? false : true,

    getLoggedUserInformation: state => state.loggedUserInformation,
    getUserById: state => state.userById,

    getNextMenu: state => state.nextMenu,

    getNextMenuMain: state => {
      const menuMain = state.nextMenu.dishes.filter(
        menu => menu.course.id === 2
      );
      return menuMain
    },
    getNextMenuDate: state => {
      const date = state.nextMenu.startDate.slice(0, 10)
      return date
    },
    getNextMenuTime: state => {
      const time = state.nextMenu.startDate.slice(11, 16)
      return time
    },
    getParticipantByEmail: state => state.participantEmail,

    getAllMenus: state => state.menus,

    getMenuMain: state => (id) => {
      const menu = state.menus.filter(
        menu => menu.id === id
      );
      //console.log(menu)

      const menuMain = menu[0].dishes.filter(
        menu => menu.course.id === 2
      )
      console.log(menuMain)
      return menuMain
    },
    getMenuStarter: state => (id) => {
      const menu = state.menus.filter(
        menu => menu.id === id
      );
      //console.log(menu)

      const menuStarter = menu[0].dishes.filter(
        menu => menu.course.id === 1
      )
      console.log(menuStarter)
      return menuStarter
    },

    getMenuDessert: state => (id) => {
      const menu = state.menus.filter(
        menu => menu.id === id
      );
      //console.log(menu)

      const menuDessert = menu[0].dishes.filter(
        menu => menu.course.id === 3
      )
      console.log(menuDessert)
      return menuDessert
    },
    getAllDishes: state => state.dishes,

    getDish: state => (id) => {
      const dish = state.dishes.rows.filter(
        dish => dish.id === id
      );
      console.log("coiso")

      return dish
    },

  },

  actions: {

    async RetrieveLoggedUserInformation(context) {
      if (context.state.loggedUser !== null) {

        let data = await UserService.fetchUserById(
          context.state.loggedUser,
          context.state.loggedUser.userId
        );
        console.log("maravilha " + data)

        context.commit("LOGGED_USER_INFORMATION", data);
        localStorage.setItem(
          "loggedUserInformation",
          JSON.stringify(context.state.loggedUserInformation)
        );
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
    async getUserById(context, id) {
      if (context.state.loggedUser !== null) {

        let data = await UserService.fetchUserById(
          context.state.loggedUser,
          id
        );


        context.commit("GET_USER_BY_ID", data);

      }
    },
    async getNextMenu(context) {
      let data = await MenuService.fetchNextMenu();
      console.log("data aa " + JSON.stringify(data));
      context.commit("GET_NEXT_MENU", data)

    },
    async getParticipant(context, userEmail) {
      if (context.state.loggedUser !== null) {
        let data = await UserService.fetchUserByEmail(context.state.loggedUser, userEmail);
        context.commit("GET_PARTICIPANT", data)

      }
    },
    async getAllMenus(context) {
      let data = await MenuService.fetchAllMenus();
      //console.log("getAllMenus " + JSON.stringify(data));
      console.log("getAllMenus " + data);
      context.commit("GET_ALL_MENUS", data)
    },

    async getAllDishes(context) {
      if (context.state.loggedUser !== null) {

        let data = await DishService.fetchAllDishes(context.state.loggedUser);


        context.commit("GET_ALL_DISHES", data);
      }
    },

    async getDishById(context, dishId) {
      if (context.state.loggedUser !== null) {

        let data = await DishService.fetchDishById(
          context.state.loggedUser,
          dishId);
        context.commit("GET_DISH_BY_ID", data);
      }
    },
    async createReservation(context, reservation) {
      if (context.state.loggedUser !== null) {

        await ReservationService.createReservation(
          context.state.loggedUser,
          reservation);

      }
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
    GET_USER_BY_ID(state, data) {
      state.userById = data;
    },
    GET_NEXT_MENU(state, data) {
      state.nextMenu = data
    },
    GET_PARTICIPANT(state, data) {
      state.participantEmail = data
    },
    GET_ALL_MENUS(state, data) {
      state.menus = data
    },
    GET_DISH_BY_ID(state, data) {
      state.dishById = data
    },
    GET_ALL_DISHES(state, data) {
      state.dishes = data
    }

  },
  modules: {},
});

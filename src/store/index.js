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
    userById: [],
    menus: [],
    nextMenu: {},
    activeMenu:{},
    dishes: [],
    activeDish:[],
    dishById: [],
    Reservations: [],
    userReservations: [],
    nextReservation: {},
    activeReservation: {},
    reservationsParticipant: [],
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

    isLoggedAdmin: state => {



      if (state.loggedUserInformation != null) {
        console.log(state.loggedUserInformation.role.id)
        if (state.loggedUserInformation.role.id == 2) {
          return true
        }
        else {
          return false
        }
      }
      else {
        return false
      }

      /*
     state.loggedUser === null
       ? false
       : state.loggedUserInformation.role.desc === "admin"
         ? true
         : false*/
    },

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

    getAllMenusFiltered: state => (date) =>{
      const menusFiltered = state.menus.filter(
        menu => menu.startDate.slice(0,10) >= date || date == ""
      )
      return menusFiltered

    },

    getMenuById: state => (id) => {
      const menu = state.menus.filter(
        menu => menu.id === id
      )
      return menu
    },

    getMenuMain: state => (id) => {
      const menu = state.menus.filter(
        menu => menu.id === id
      );
      //console.log(menu)

      const menuMain = menu[0].dishes.filter(
        menu => menu.course.id === 2
      )
      //console.log(menuMain)
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
      if (id != null) {
        const dish = state.dishes.rows.filter(
          dish => dish.id === id
        );
        console.log("coiso")

        return dish
      }
      else {
        let response = "nao aplicavel"
        return response
      }

    },
    getDishById: state => state.activeDish,

    getNextReservation: state => state.nextReservation,

    getActiveReservation: state => state.activeReservation,

    getUserReservations: state => state.userReservations,

    getUserReservationsFiltered: state => (minDate,maxDate,reservationStatus, _sort) =>{
      const userReservations = state.userReservations.filter(
        reservation => reservation.startDate.slice(0,10) >= minDate || minDate ==""
      )
      const userReservations2 = userReservations.filter(
        reservation => reservation.startDate.slice(0,10) <= maxDate || maxDate ==""
      )
      var userReservations3 = userReservations2.filter(
        reservation => reservation.status.id ==reservationStatus || reservationStatus==""
      )
      return userReservations3.sort((a,b) =>{
        if(a.id > b.id) return -1 * _sort;
        if(a.id < b.id) return 1 * _sort;
        return 0
      })

    },

    getReservationsParticipant: state => state.reservationsParticipant,


    getStarterDishForSelect: state => {
    const starters = state.dishes.rows.filter(
      dish => dish.course.id===1
    )
     const dishes=  starters.map(dish => ({
      code: dish.id,
      label: dish.name
    }))
      return dishes

    },
    getMainDishForSelect: state => {
      const mains = state.dishes.rows.filter(
        dish => dish.course.id===2
      )
       const dishes=  mains.map(dish => ({
        code: dish.id,
        label: dish.name
      }))
        return dishes
  
      },
      getDessertDishForSelect: state => {
        const desserts = state.dishes.rows.filter(
          dish => dish.course.id===3
        )
         const dishes=  desserts.map(dish => ({
          code: dish.id,
          label: dish.name
        }))
          return dishes
    
      },

      getActiveMenu: state => state.activeMenu,


      getActiveMenuMain: state  => {
        const menuMain = state.activeMenu.dishes.filter(
          menu => menu.course.id === 2
        )
        console.log(menuMain)
        return menuMain
      },
      getActiveMenuStarter: state  => {
        const menuStarter = state.activeMenu.dishes.filter(
          menu => menu.course.id === 1
        )
        //console.log(menuMain)
        return menuStarter
      },
      getActiveMenuDessert: state  => {
        const menuDessert = state.activeMenu.dishes.filter(
          menu => menu.course.id === 3
        )
        //console.log(menuMain)
        return menuDessert
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
    async getAllReservations(context){
      let data = await ReservationService.fetchAllReservations(context.state.loggedUser);
      //console.log("getAllReservations " + JSON.stringify(data));
      context.commit("GET_ALL_RESERVATIONS", data)

    },
    async createReservation(context, reservation) {
      if (context.state.loggedUser !== null) {

        await ReservationService.createReservation(
          context.state.loggedUser,
          reservation);

      }
    },
    async getNextReservation(context) {
      if (context.state.loggedUserInformation !== null) {
        if (context.state.loggedUser !== null) {

          let data = await ReservationService.fetchNextReservation(
            context.state.loggedUser,
          );
          console.log("reservation " + data)
          if (data != null) {
            console.log("reservation " + data.id)

            let data2 = await ReservationService.fetchReservationById(
              context.state.loggedUser,
              data.id
            );

            context.commit("GET_NEXT_RESERVATION", data2)
          }

        }
      }
    },
    async getUserReservations(context) {
      if (context.state.loggedUser !== null) {

        let data = await ReservationService.fetchUserReservations(
          context.state.loggedUser,
        );
        console.log("reservations " + data.length)
        for (let i = 0; i < data.length; i++) {
          let participant = await ReservationService.fetchReservationById(
            context.state.loggedUser,
            data[i].id
          );
          data[i].participants = participant.participants

        }




        context.commit("GET_USER_RESERVATIONS", data)
      }

    },

    async getReservationById(context, reservationId) {
      if (context.loggedUser !== null) {
        let data = await ReservationService.fetchReservationById(
          context.state.loggedUser,
          reservationId
        );
        context.commit("RESERVATION_INFO", data)
      }
    },
    /*
        async getReservationPartcipant(context, reservationId) {
          if (context.loggedUser !== null) {
            let data = await ReservationService.fetchReservationById(
              context.state.loggedUser,
              reservationId
            );
            console.log(data.participants)
            context.commit("PARTICIPANT_INFO", data.participants)
          }
        }*/

    async createDish(context, dish) {
      if (context.state.loggedUser !== null) {

        await DishService.createDish(
          context.state.loggedUser,
          dish);

      }
    },

    async createMenu(context,menu){
      if(context.state.loggedUser!==null){
        await MenuService.createMenu(
          context.state.loggedUser,
          menu
        )
      }
    },

    setActiveDish(context,dish){
      context.commit("SET_ACTIVE_DISH", dish)
    },

    async updateDish(context,dish){
      if(context.state.loggedUser!==null){
        await DishService.updateDish(
          context.state.loggedUser,
          dish,
          context.state.activeDish.id
        )
      }
    },

    async deleteDish(context,id){
      if(context.state.loggedUser !==null){
        await DishService.deleteDish(context.state.loggedUser,id)
      }
    },
    setActiveMenu(context,menu){
      context.commit("SET_ACTIVE_MENU", menu)
    },
    async updateReservationStatus(context,reservation){
      if(context.state.loggedUser !== null){
        await ReservationService.updateReservationStatus(context.state.loggedUser,
          reservation,
          context.state.activeReservation.id)
      }

    },
    async incrementSupplements(context,reservation){
      if(context.state.loggedUser !== null){
        await ReservationService.incrementSupplements(context.state.loggedUser,
          reservation,
          context.state.activeReservation.id)
      }
    },
    async paymentByParticipant(context,payment){
      if(context.state.loggedUser !== null){
        await ReservationService.paymentByParticipant(context.state.loggedUser,
          payment,
          context.state.activeReservation.id,
          payment.id)
      }
    },
    async updateMenu(context,menu){
      if(context.state.loggedUser !== null){
        await MenuService.updateMenu(
          context.state.loggedUser,
          menu,
          context.state.activeMenu.id
        )
      }
    },
    async decrementMenuOpenReservations(context,payload){
      if(context.state.loggedUser !== null){
       
        await MenuService.decrementMenuOpenReservations(
          context.state.loggedUser,
          payload,
          payload.menuId
         
        )
      }
    },
    async decrementMenuDishQuantity(context,payload){
      
      if(context.state.loggedUser !== null){
        await MenuService.decrementMenuDishQuantity(
          context.state.loggedUser,
          payload,
          payload.menuId,
          payload.dishId,
        )
      }
    },

    async updateAvatar(context,avatar){
      if(context.state.loggedUser !==null){
        await UserService.updateAvatar(
          context.state.loggedUser,
          context.state.loggedUser.userId,
          avatar
        )
        
      }
    },
    async changePassword(context,userCredentials){
      if(context.state.loggedUser !==null){
        await AuthService.changePassword(
          context.state.loggedUser,
          userCredentials
        )
      }
    },

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
      state.userById=data;
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
    },
    GET_ALL_RESERVATIONS(state,data){
      state.userReservations = data
    },
    GET_NEXT_RESERVATION(state, data) {
      state.nextReservation = data
    },
    RESERVATION_INFO(state, data) {
      state.activeReservation = data
    },
    GET_USER_RESERVATIONS(state, data) {
      state.userReservations = data
    },
    PARTICIPANT_INFO(state, data) {
      state.reservationsParticipant = data
    },
    SET_ACTIVE_DISH(state,data){
      state.activeDish =data
    },
    SET_ACTIVE_MENU(state,data){
      state.activeMenu = data
    }

  },
  modules: {},
});

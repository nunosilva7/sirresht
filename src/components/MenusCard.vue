<template>
  <div id="divMenuCard" style="margin-bottom:3%;margin-right:5%">
    <b-container id="nextMenuCard" style="background-color: white;height:280px;width:500px; " >
      <b-row no-gutters>
        <b-col cols="5" style="margin-top: 4px">
          <b-img id="menuDateImg" src="../assets/icons/calendar24.png"></b-img>
          <span id="menuDate"> {{ getNextMenuDate() }}</span>
        </b-col>
        <b-col cols="4" style="margin-top: 3px">
          <b-img id="menuTimeImg" src="../assets/icons/clock24.png"></b-img>
          <span id="menuTime"> {{ getNextMenuTime() }}H</span>
        </b-col>
        <b-col style="margin-top: 3px">
          <b-img
            id="menuPriceImg"
            src="../assets/icons/money24.png"
            style="margin-right: 5px"
          ></b-img>
          <span id="menuPrice">{{ menu.price }}€</span></b-col
        >
      </b-row>

      <br />
      <b-row>
        <b-col cols="4">
          <img
          style="border-radius:20%"
            id="menuImg"
            src="https://www.pingodoce.pt/wp-content/uploads/2021/09/folhas-alface-com-frango-couve-roxa-e-maionese.jpg"
            alt=""
            width="90%"
            height="80px"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8">
          <p id="menuMainName" class="justify-content-md-center" style="margin-top: 5%;text-align:center">
            {{ getMenuMain(menu.id)[0].name }}
          </p>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="4">
          <img
           style="border-radius:20%"
            id="menuImg"
            src="https://www.pingodoce.pt/wp-content/uploads/2021/09/peixe-espada-grelhado-com-salada-feijao-frade.jpg"
            alt=""
            width="90%"
            height="80px"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8"
          ><p id="menuMainName" style="margin-top: 5%;text-align:center">{{ getMenuMain(menu.id)[1].name }}</p>
        </b-col>
      </b-row>
      
      
      <div id="expandNextMenu" style="margin-top:3%">
        <b-img
          id="expandNextMenuImg"
          src="../assets/icons/expand-arrows48.png"
        ></b-img>
       <br />
      </div>
       
    </b-container>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  name: "Menus",
  props: {
    menu: Object,
  },
  methods: {
    isLoggedUser() {
      return this.$store.getters.isLoggedUser;
    },
    getMenuMain(id) {
      console.log(this.$store.getters.getMenuMain);
      return this.$store.getters.getMenuMain(id);
    },
    getNextMenuDate() {
      const date = this.menu.startDate.slice(0, 10)
      return date
    },
    getNextMenuTime() {
      const time = this.menu.startDate.slice(11, 16)
      return time
    },
  },
};
</script>
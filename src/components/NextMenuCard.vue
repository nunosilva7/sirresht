<template>
  <div id="divMenuCard">
    <b-container id="nextMenuCard" style="background-color: white;height:310px">
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
          <span id="menuPrice">{{ nextMenu.price }}€</span></b-col
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
            width="100%"
            height="100px"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8">
          <p class="justify-content-md-center" style="margin-top: 5%;text-align:center">
            {{ getNextMenuMain()[0].name }}
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
            width="100%"
            height="100"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8"
          ><p style="margin-top: 5%;text-align:center">{{ getNextMenuMain()[1].name }}</p>
        </b-col>
      </b-row>
      <div id="expandNextMenu">
        <b-img
          id="expandNextMenuImg"
          src="../assets/icons/expand-arrows48.png"
        ></b-img>
        <br />
      </div>
      <div>
        <p id="seeAllMenus" style="text-align:right;margin-top:3%"
        
        >Ver todos</p>
      </div>
    </b-container>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  name: "NextMenuCard",
  props: {
    nextMenu: Object,
  },
  methods: {
    isLoggedUser() {
      return this.$store.getters.isLoggedUser;
    },
    getNextMenuMain() {
      console.log(this.$store.getters.getNextMenuMain);
      return this.$store.getters.getNextMenuMain;
    },
    getNextMenuDate() {
      return this.$store.getters.getNextMenuDate;
    },
    getNextMenuTime() {
      return this.$store.getters.getNextMenuTime;
    },
  },
};
</script>
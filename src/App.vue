<template>
  <div id="app">
    <TopNavbar id="topNavBar"> :isLoggedUser ="isLoggedUser" </TopNavbar>
    <BottomNavBar id="bottomNavBar"></BottomNavBar>

    <router-view />
  </div>
</template>

<script>
import TopNavbar from "./components/TopNavBar";
import BottomNavBar from"./components/BottomNavBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TopNavbar,
    BottomNavBar,
  },
  created() {
    this.nextMenu();
  },
  methods: {
    async nextMenu(){
       await this.$store.dispatch("getNextMenu");
    }
  },
  computed: {
    ...mapGetters({
      isLoggedUser: "isLoggedUser",
      getLoggedUserInformation: "getLoggedUserInformation",
      isLoggedAdmin:"isLoggedAdmin",

    }),
  },
  metaInfo: {
    title: "sirresht",
    titleTemplate: "%s | restaurante ESHT",
    htmlAttrs: {
      lang: "pt-PT"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content: "Esta página serve para reservar refeições."
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "keywords",
        content:
          "ESHT, Sirresht, Almoços, Jantares, Menus, Reservas,"
      },
      { name: "author", content: "Nuno Silva" }
    ]
  }
};
</script>
<style scoped >
body{
    background-color: #EBEBEB;
  
}

@font-face {
  font-family: "Fredoka";
  src: local("Fredoka"),
   url(./assets/fonts/Fredoka/Fredoka-VariableFont.ttf) format("truetype");
}


@media screen and (max-width:1096px) {
  #topNavBar{
    background-color: black;
  }
  
}



</style>

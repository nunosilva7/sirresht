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

    }),
  },
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

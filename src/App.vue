<template>
  <div id="app">
    <TopNavbar> 
      :isLoggedUser ="isLoggedUser"
    </TopNavbar>
    <router-view />
  </div>
</template>

<script>
import TopNavbar from "./components/TopNavBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TopNavbar,
  },
   computed: {
    ...mapGetters({
      isLoggedUser: "isLoggedUser",
     
    })
  },
};
</script>
<style src="./assets/customStyle.css">

</style>

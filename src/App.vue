<template>
  <div id="app">
    <TopNavbar> :isLoggedUser ="isLoggedUser" </TopNavbar>
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
    }),
  },
};
</script>
<style src="./assets/customStyle.css">
</style>

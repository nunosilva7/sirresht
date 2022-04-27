<template>
  <div id="app">
    <TopNavbar> </TopNavbar>
    <router-view />
  </div>
</template>

<script>
import TopNavbar from "./components/TopNavBar";

export default {
  name: "App",
  components: {
    TopNavbar,
  },
};
</script>
<style src="./assets/customStyle.css">

</style>

<template>
  <div class="home">
    <div>
      <h1>HOME</h1>
         
      <b-container >
        <div style="text-align: center;"><h1>Menu Destaque</h1></div>
       
          <b-card-group id="menuCard" class="justify-content-md-center" >
            <NextMenuCard :key="getNextMenu.id" :nextMenu="getNextMenu" />
          </b-card-group>
      
        
      </b-container>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import NextMenuCard from "../components/NextMenuCard.vue";

export default {
  name: "Home",
  components: {
    NextMenuCard,
  },
  data() {
    return {
      menu: {},
    };
  },
  computed: {
    getNextMenu() {
      return this.$store.getters.getNextMenu;
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>

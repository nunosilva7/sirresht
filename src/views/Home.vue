<template>
  <div class="home">
    <div>
      <h1>HOME</h1>
      <b-container>
        <h1>Menu Destaque</h1>
        <b-row>
          <b-card-group>
            <NextMenuCard :key="getNextMenu.id" :nextMenu="getNextMenu" />
          </b-card-group>
        </b-row>
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

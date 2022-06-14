<template>
  <div id="menus" style="margin: auto">
    <br /><br />
    <b-container style="margin-left:2%">
    
    <b-row >
      <b-col >
        <label for="select3">Data</label>
      </b-col>
    </b-row>

    <b-row >
      <b-col >
        <b-form-datepicker
          id="example-datepicker"
           placeholder="YYYY-MM-DD"
         
          class="mb-2"
        ></b-form-datepicker>
      </b-col>
    </b-row>
    </b-container>

    <hr class="rounded" />
    <b-container fluid>
      <h1 v-if="!getAllMenus.length">Não Foram Encontrados menus!</h1>
      <b-row style="margin-right: 0%; margin-left: 10%" id="menuCardRow">
        <MenusCard
          v-for="myMenu in getAllMenus"
          :key="myMenu.id"
          :menu="myMenu"
        />
      </b-row>
    </b-container>

  
  </div>
</template>

<script>
import MenusCard from "../components/MenusCard.vue";

export default {
  name: "Menus",
  components: {
    MenusCard,
  },
  data() {
    return {
      ordem: null,
      estado: null,
      users: [],
    };
  },
 
  methods: {
    
  },
  computed: {
   getAllMenus() {
       console.log(this.$store.getters.getAllMenus)
      return this.$store.getters.getAllMenus;
    },
  },
};
</script>

<style>
</style>
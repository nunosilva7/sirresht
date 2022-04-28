<template>
  <b-card
    img-src="https://www.receitasemenus.net/wp-content/uploads/2018/10/receitas-carne.jpg"
    :title="nextMenu.dishes[0].name"
    img-top
    tag="article"
    :id="`cardEvent${nextMenu.id}`"
    img-height="250px"
    style="width:560px; margin-left:50px; margin-right:50px; background-color:#f3f3fb"
    img-alt="Imagem ddo menu"
  >
    <b-card-text> Preço: {{nextMenu.price}}€</b-card-text>

  

  </b-card>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  name: "NextMenuCard",
  props: {
    nextMenu: Object
  },
  methods: {
    isLoggedUser() {
      return this.$store.getters.isLoggedUser;
    },
    
    setActiveBolsa(bolsa) {
      this.$store.dispatch("setActiveBolsa", bolsa);
    },
    
  }
};
</script>
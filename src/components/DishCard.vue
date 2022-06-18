<template>
  <div id="divDishesCard" style="width: 400px; margin: 1%">
    <b-card
    :title=dish.name
    :img-src=dish.imageReference
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;height:25rem"
    class="mb-2"
  >

    <b-button  style="position:absolute;top:85%;left:27%;width:50%;background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;" @click="getDishById(dish)"  v-b-modal.dishModal variant="primary">Editar</b-button>
  </b-card>

      

       

     
      

      

   
  </div>
</template>

<script>
export default {
  name: "DishesCard",
  props: {
    dish: Object,
  },
  data() {
    return {
      
    };
  },

  
  methods: {

    getDishById(dish){
      //this.$store.dispatch("getDishById",id)
      this.$store.dispatch("setActiveDish", dish)
    }

  
   
  },

};
</script>

<style>
</style>
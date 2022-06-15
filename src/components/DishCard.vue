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
    <b-card-text>
      Faz parte da carta? {{dish.isALaCarte}}
    </b-card-text>
    <b-card-text>
      Id: {{dish.id}}
    </b-card-text>

    <b-button  style="position:absolute;top:85%;left:40% " href="#" variant="primary">Editar</b-button>
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

  
   
  },

};
</script>

<style>
</style>
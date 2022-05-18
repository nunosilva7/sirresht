<template>
  <div  >
    <b-container  id="nextMenuCard" style="background-color: white; margin: "  >
      <b-row no-gutters >
        <b-col cols="5"  style="margin-top:3px;" >
          
          <b-img
            src="../assets/icons/calendar24.png"
            
          ></b-img
          >
          <span> {{ getNextMenuDate() }}</span>
         </b-col
        >
        <b-col cols="4" style="margin-top:3px">
          <b-img
            src="../assets/icons/clock24.png"
           
          ></b-img
          >
          <span> {{ getNextMenuTime() }}H</span>
         </b-col>
        <b-col style="margin-top:3px">
           <b-img
            src="../assets/icons/money24.png"
            style="margin-right:5px;"
           
          ></b-img
          >
          <span >{{ nextMenu.price }}€</span></b-col>
      </b-row>
      <br />
      <br />
      <b-row >
        <b-col id="menuImg" cols="4">
          <img
            src="https://www.receitasemenus.net/wp-content/uploads/2018/10/receitas-carne.jpg"
            alt=""
            width="100%"
            height="100px"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8"> <p class="justify-content-md-center" style="margin-top:5%">{{ getNextMenuMain()[0].name }}</p> </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="4">
          <img
            src="https://www.receitasemenus.net/wp-content/uploads/2018/10/receitas-carne.jpg"
            alt=""
            width="100%"
            height="100"
          />
        </b-col>
        <br />
        <br />
        <b-col cols="8"><p style="margin-top:5%">{{ getNextMenuMain()[1].name }}
            </p> 
        
        </b-col>
        
      </b-row>
      <div id="expandNextMenu"> 
        <b-img
            src="../assets/icons/expand-arrows48.png"
            
          ></b-img>
          <br></div>
     
 
   
     
     
    </b-container>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  name: "NextMenuCard",
  props: {
    nextMenu: Object,
  },
  methods: {
    isLoggedUser() {
      return this.$store.getters.isLoggedUser;
    },
    getNextMenuMain() {
      console.log(this.$store.getters.getNextMenuMain);
      return this.$store.getters.getNextMenuMain;
    },
    getNextMenuDate() {
      return this.$store.getters.getNextMenuDate;
    },
    getNextMenuTime() {
      return this.$store.getters.getNextMenuTime;
    },
  },
};
</script>
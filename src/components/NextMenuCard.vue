<template>
  <div>
    <b-container id="card" style="background-color:white">
      <b-row>
        <b-col>{{ getNextMenuDate()}}</b-col>
        <b-col>{{ getNextMenuTime()}}</b-col>
        <b-col>{{nextMenu.price}}€</b-col>
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col>
          <img
            src="https://www.receitasemenus.net/wp-content/uploads/2018/10/receitas-carne.jpg"
            alt=""
            width="150px"
            height="150px"
          />
        </b-col>
        <br />
        <br />
        <b-col>  {{ getNextMenuMain()[0].name }} </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <img
            src="https://www.receitasemenus.net/wp-content/uploads/2018/10/receitas-carne.jpg"
            alt=""
            width="150px"
            height="150px"
          />
        </b-col>
        <br />
        <br />
        <b-col> {{ getNextMenuMain()[1].name }} </b-col>
        
      </b-row>
      <br>
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
    getNextMenuMain(){
      console.log(this.$store.getters.getNextMenuMain)
      return this.$store.getters.getNextMenuMain;

    },
    getNextMenuDate(){
       return this.$store.getters.getNextMenuDate;
    },
     getNextMenuTime(){
       return this.$store.getters.getNextMenuTime;
    }
  },
};
</script>
<template>
  <div id="divReservationCard">
    <b-container
      id="nextReservationCard"
      style="background-color: white; width: 500px; height: 280px"
      fluid
    >
      <b-row no-gutters>
        <b-col> <br /></b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Reserva #{{ nextReservation.id }}</h3>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <h6 :style="statusStyleColor" style="margin-left: 10%;color:#FC004C">{{getNextReservationStatus()}}</h6>
        </b-col>

        <b-col>
          <b-img
            id="menuDateImg"
            src="../assets/icons/calendar24.png"
            style="
              width: 30px;
              height: 30px;
              margin-bottom: 5%;
              margin-right: 5%;
            "
          ></b-img>
          <span id="menuDateText">{{ getNextReservationDate() }}</span>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6"></b-col>

        <b-col>
          <b-img
            id="menuDateImg"
            src="../assets/icons/clock24.png"
            style="
              width: 30px;
              height: 30px;
              margin-bottom: 5%;
              margin-right: 5%;
            "
          ></b-img>
          <span id="menuTimeText">{{ getNextReservationTime() }}H</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6"> <h5></h5></b-col>

        <b-col>
          <b-img
            id="menuDateImg"
            src="../assets/icons/money24.png"
            style="
              width: 30px;
              height: 30px;
              margin-bottom: 5%;
              margin-right: 5%;
            "
          ></b-img>
          <span> {{ nextReservation.reservationPrice }}€ </span>
        </b-col>
      </b-row>

      <b-row id="participants">
        <b-col>
          <h5 style="font-family:Fredoka regular">Participantes</h5>
          
            <b-avatar-group  size="40px">
              <b-avatar v-for="participant in nextReservation.participants" :key="participant.id" alt="avatar" :src=participant.user.avatarReference></b-avatar>
             
            </b-avatar-group>
         
        </b-col>
      </b-row>

      <div
        id="expandNextReservation"
        @click="getReservationById(nextReservation.id)"
        v-b-modal.nextReservationModal
      >
        <b-img
          id="expandNextReservationImg"
          src="../assets/icons/expand-arrows48.png"
        ></b-img>
        <br />
          
      </div>
      <div>
        <p id="seeAllReservations" style="text-align:right;margin-top:1%"
        
        >Ver todas</p>
      </div>
    
    </b-container>
    
  </div>
</template>

<script>
export default {
  name: "NextReservationCard",
  props: {
    nextReservation: Object,
  },

  data() {
    return {
      users: [],
      statusStyleColor:{
        color:'black'
      }
     
    };
  },

  created:  function () {
    //this.getReservationParticipant(this.reservation.id)
      //this.getUser()
      
  },
  
 
  methods: {
    getNextReservationDate() {
      const date = this.nextReservation.startDate.slice(0, 10);
      return date;
    },

    getNextReservationTime() {
      const time = this.nextReservation.startDate.slice(11, 16);
      return time;
    },
    getReservationById(id) {
      this.$store.dispatch("getReservationById", id);
    },/*
    getUser(){
      let users = this.$store.getters.getUserById;
    for (let i = 0; i < this.nextReservation.participants.length; i++) {
      if (users.length!=0) {
        if (
          users.filter(
            (user) => user.id != this.nextReservation.participants.participants[i].userId
          )
        ) {
           this.$store.dispatch(
            "getUserById",
            this.nextReservation.participants[i].userId
          );
        }
      }
      else{
         this.$store.dispatch(
            "getUserById",
            this.nextReservation.participants[i].userId
          );
      }
    }
    this.users = users;
     
    },
     findAvatar(id){
      
      let userAvatar =this.users.find(user => user.id == id)
      return userAvatar.avatarReference
     
      

    }*/
     getNextReservationStatus() {
      let status = this.nextReservation.status.id;

      //let statusColor = this.$refs.nextReservationStatus

      let statusString = "";
      switch (status) {
        case 1:
          statusString = "Pendente";
          this.statusStyleColor.color="red"
          // console.log(statusColor)

          break;

        case 2:
          statusString = "Aprovada";
          this.statusStyleColor.color="green"
          break;
        case 3:
          statusString = "Rejeitada";
          this.statusStyleColor.color="red"
          break;
        case 4:
          statusString = "Cancelada";
          this.statusStyleColor.color="red"
          break;
        case 5:
          statusString = "Concluído";
          this.statusStyleColor.color="green"
          break;
        case 6:
          statusString = "Não comparência";
          this.statusStyleColor.color="red"
          break;
        default:
          statusString = "Erro";
      }
      console.log(status);
      return statusString;
    },
  },
  
};
</script>

<style>
</style>
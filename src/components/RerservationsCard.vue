<template>
  <div id="divReservationCard" style="width:400px;margin:1%;">
    <b-container id="reservationCard" style="background-color: white; width:400px;height:280px" fluid>
      <b-row no-gutters>
        <b-col >  <br></b-col>
      </b-row>
  
      <b-row>
        <b-col>
          <h3>Reserva #{{ reservation.id }}</h3> 
           </b-col>
      </b-row>

      <b-row>
        <b-col cols="6" >
          <h6 style="margin-left:10%">  Pendente </h6>
        </b-col>
        
        <b-col > 
          <b-img id="menuDateImg" src="../assets/icons/calendar24.png" style="width:30px;height:30px;margin-bottom:5%;margin-right:5%"></b-img>
          <span>{{ getNextReservationDate() }}</span>
          
           </b-col>
      </b-row>

      <b-row >
        <b-col cols="6"></b-col>
         
        <b-col>
          <b-img id="menuDateImg" src="../assets/icons/clock24.png" style="width:30px;height:30px;margin-bottom:5%;margin-right:5%"></b-img>
          <span>{{ getNextReservationTime() }} </span>
          
          </b-col>
      </b-row>
      <b-row>
        <b-col cols="6"> <h5></h5></b-col>
        
        <b-col>
           <b-img id="menuDateImg" src="../assets/icons/money24.png" style="width:30px;height:30px;margin-bottom:5%;margin-right:5%"></b-img>
          <span>  {{ reservation.reservationPrice }}€ </span>
        
          </b-col>
      </b-row>
      
      <b-row>
        <b-col>
          <h5>Participantes</h5>
            <b-avatar-group size="40px">
              <b-avatar v-for="participant in reservation.participants" :key="participant.id"></b-avatar>
             
            </b-avatar-group>
          </b-col>
      </b-row>
      

       <div id="expandNextReservation"
       @click="getReservationById(reservation.id)"
        v-b-modal.reservationModal>
        <b-img 
          id="expandNextReservationImg"
          src="../assets/icons/expand-arrows48.png"
        ></b-img>
        <br />
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ReservationsCard",
  props: {
    reservation: Object,
  },
  /*
  created: function(){
    this.getReservationParticipant(this.reservation.id)

  },*/
  methods: {
    getNextReservationDate() {
      const date = this.reservation.startDate.slice(0, 10);
      return date;
    },

    getNextReservationTime() {
      const time = this.reservation.startDate.slice(11, 16);
      return time;
    },
    getReservationById(id) {
      this.$store.dispatch("getReservationById", id);
    },
    /*
    async getReservationParticipant(id){
      await this.$store.dispatch("getReservationPartcipant",id)
     
    },
    getReservationsParticipant(){
      return this.$store.getters.getReservationsParticipant;
    }*/
  },
};
</script>

<style>
</style>
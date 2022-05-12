<template>
  
    <b-card 
    style="width:30%; margin-left:10%; margin-right:10%; margin-bottom:3%">
      <b-row >
        <b-col>
          <b-card-text>Reserva #{{ reservation.id }}</b-card-text>
        </b-col>
      </b-row>

        <b-row>
        <b-col>
          <b-card-text>{{ reservation.status.desc }}</b-card-text>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card-text>{{ getNextReservationDate() }}</b-card-text>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card-text>{{ getNextReservationTime() }}</b-card-text>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card-text>{{ reservation.reservationPrice }}€</b-card-text>
        </b-col>
      </b-row>

       <b-row>
        <b-col>
          <b-card-text>Participantes: {{reservation.participants.length}}</b-card-text>
        </b-col>
      </b-row>

       <b-row>
        <b-button
        @click="getReservationById(reservation.id)"
        v-b-modal.reservationModal
        >Ver Mais</b-button>
      </b-row>

    </b-card>
    
  
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
       this.$store.dispatch("getReservationById",id)
    },
    /*
    async getReservationParticipant(id){
      await this.$store.dispatch("getReservationPartcipant",id)
     
    },
    getReservationsParticipant(){
      return this.$store.getters.getReservationsParticipant;
    }*/
 
  },

}
</script>

<style>

</style>
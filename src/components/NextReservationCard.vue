<template>
  <div>
    <b-container id="card" style="background-color: white; width: 580px">
      <b-row>
        <b-col> Reserva #{{ nextReservation.id }} </b-col>
      </b-row>

      <b-row>
        <b-col>  {{ nextReservation.status.desc }}</b-col>
      </b-row>

      <b-row>
        <b-col></b-col>
        <b-col> {{ getNextReservationDate() }} </b-col>
      </b-row>

      <b-row>
        <b-col></b-col>
        <b-col>{{ getNextReservationTime() }} </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>{{ nextReservation.reservationPrice }}€ </b-col>
      </b-row>
      <b-row>
        <b-col>Participantes: {{nextReservation.participants.length}}</b-col>
      </b-row>

      <b-row>
        <b-button
        @click="getReservationById(nextReservation.id)"
        v-b-modal.nextReservationModal
        >Ver Mais</b-button>
      </b-row>
    </b-container>


  </div>
</template>

<script>
export default {
  name: "NextReservationCard",
  props: {
    nextReservation: Object,
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
       this.$store.dispatch("getReservationById",id)
    },
 
  },
};
</script>

<style>
</style>
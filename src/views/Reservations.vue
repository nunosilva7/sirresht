<template>
  <div id="reservations" style="margin:auto">
    <br /><br />
    <b-container  fluid>
      <h1 v-if="!getReservations.length">Não Foram Encontrados Reservas!</h1>
      <b-row style="margin-right: 10%; margin-left: 10%" >
        <ReservationsCard
          v-for="myReservation in getReservations"
          :key="myReservation.id"
          :reservation="myReservation"
        />
      </b-row>
     
    </b-container>

    <!--Open nextReservationModal with all reservation information-->
    <b-modal id="reservationModal" @show="getActiveReservation">
      <div>{{ getActiveReservation() }}</div>
    </b-modal>
  </div>
</template>

<script>
import ReservationsCard from "../components/RerservationsCard.vue";

export default {
  name: "Reservations",
  components: {
    ReservationsCard,
  },
  created: function () {
    this.PrepareData();
  },
  methods: {
    async PrepareData() {
      await this.$store.dispatch("getUserReservations");
    },
    getActiveReservation() {
      return this.$store.getters.getActiveReservation;
    },
  },
  computed: {
    getReservations() {
      return this.$store.getters.getUserReservations;
    },
  },
};
</script>

<style>
</style>
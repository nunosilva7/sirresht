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
          <h6 style="margin-left: 10%">Pendente</h6>
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
          <span>{{ getNextReservationDate() }}</span>
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
          <span>{{ getNextReservationTime() }} </span>
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

      <b-row>
        <b-col>
          <h5>Participantes</h5>
          
            <b-avatar-group size="40px">
              <b-avatar v-for="participant in nextReservation.participants" :key="participant.id"></b-avatar>
             
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
      this.$store.dispatch("getReservationById", id);
    },
  },
};
</script>

<style>
</style>
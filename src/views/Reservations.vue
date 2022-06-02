<template>
  <div id="reservations" style="margin: auto">
    <br /><br />
    <b-container style="margin-left:2%">
    <b-row >
      <b-col >
        <label for="select">Ordem</label>
      </b-col>
      <b-col>
        <label for="select2">Estado</label>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-left" >
      <b-col >
        <b-form-select id="select" >
          <b-form-select-option value: null>Recente</b-form-select-option>
          <b-form-select-option value="antigo">Antigo</b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col >
        <b-form-select id="select2" >
          <b-form-select-option value: null>Pendente</b-form-select-option>
          <b-form-select-option value="aceite">Aceite</b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>
    <br />
    <b-row >
      <b-col >
        <label for="select3">Data</label>
      </b-col>
    </b-row>

    <b-row >
      <b-col >
        <b-form-datepicker
          id="example-datepicker"
         
           placeholder="YYYY-MM-DD"
          class="mb-2"
        ></b-form-datepicker>
      </b-col>
      <b-col >
        <b-form-datepicker
          id="example-datepicker"
           placeholder="YYYY-MM-DD"
         
          class="mb-2"
        ></b-form-datepicker>
      </b-col>
    </b-row>
    </b-container>

    <hr class="rounded" />
    <b-container fluid>
      <h1 v-if="!getReservations.length">Não Foram Encontrados Reservas!</h1>
      <b-row style="margin-right: 5%; margin-left: 5%">
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
  data(){
    return{
      ordem:null,
      estado:null
    }
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
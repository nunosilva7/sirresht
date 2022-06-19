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
        <b-form-select id="select" v-model="optionSortSelected" :options="optionsSort">
         
        </b-form-select>
      </b-col>
      <b-col >
        <b-form-select id="select2" :options="options" required v-model="reservationStatusSelect">
          <template #first>
              <b-form-select-option value="">TODAS</b-form-select-option>
            </template>
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
          :max="maxDate"
          v-model="minDate"
        ></b-form-datepicker>
      </b-col>
      <b-col >
        <b-form-datepicker
          :disabled="!isDate1Picked()"
          id="example-datepicker2"
          placeholder="YYYY-MM-DD"
          class="mb-2"
          :min="minDate"
          v-model="maxDate"
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
  data() {
    return {
      ordem: null,
      estado: null,
      users: [],
      reservationStatusSelect: "",
      options: [
        { value: 1, text: "Pendente" },
        { value: 2, text: "Aprovada" },
        { value: 3, text: "Rejeitada" },
        { value: 4, text: "Cancelada" },
        { value: 5, text: "Completada" },
        { value: 6, text: "Sem Comparência" },
      ],
      minDate:"",
      maxDate:"",

      optionSortSelected:1,
      optionsSort: [
        {
          value: 1,
          text: "Mais Recentes"
        },
        {
          value: -1,
          text: "Mais Antigos"
        }
      ],
    };
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
    isDate1Picked(){
      if(this.minDate =="" || this.minDate ==null){
        return false
      }
      else{
        return true
      }
    }
  },
  computed: {
    getReservations() {
      //return this.$store.getters.getUserReservations;

      return this.$store.getters.getUserReservationsFiltered(
        this.minDate,
        this.maxDate,
        this.reservationStatusSelect,
        this.optionSortSelected

      )



    },
  },
};
</script>

<style>
</style>
<template>
  <div id="divReservationCard" style="width: 400px; margin: 1%">
    <b-container
      id="reservationCard"
      style="background-color: white; width: 400px; height: 280px"
      fluid
    >
      <b-row no-gutters>
        <b-col> <br /></b-col>
      </b-row>

      <b-row>
        <b-col>
          <h3>Reserva #{{ reservation.id }}</h3>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <h6 :style="statusStyleColor" >{{getNextReservationStatus()}}</h6>
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
          <span>{{ getNextReservationTime() }}H</span>
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
          <span> {{ reservation.reservationPrice }}€ </span>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h5>Participantes</h5>
          <b-avatar-group size="40px">
            <b-avatar
              v-for="participant in reservation.participants"
              :key="participant.id"
              
              :src=participant.user.avatarReference
            >
            </b-avatar>
          </b-avatar-group>
        </b-col>
      </b-row>

      <div
        id="expandNextReservation"
        @click="getReservationById(reservation.id)"
        v-b-modal.reservationModal
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
  name: "ReservationsCard",
  props: {
    reservation: Object,
  },
  data() {
    return {
      users: [],
      avatar:"",
      statusStyleColor:{
        color:'black'
      }
    };
  },

  created:  function () {
    //this.getReservationParticipant(this.reservation.id)
    /*
    let users = this.$store.getters.getUserById;
    for (let i = 0; i < this.reservation.participants.length; i++) {
      if (users.length!=0) {
        if (
          users.filter(
            (user) => user.id != this.reservation.participants[i].userId
          )
        ) {
           this.$store.dispatch(
            "getUserById",
            this.reservation.participants[i].userId
          );
        }
      }
      else{
         this.$store.dispatch(
            "getUserById",
            this.reservation.participants[i].userId
          );
      }
    }
    this.users = users;*/
  },
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
    getUserById(id) {
      this.$store.dispatch("getUserById", id);
      return this.$store.getters.getUserById.avatarReference;
    },
    getLoggedUser() {
      console.log(this.$store.getters.getLoggedUserInformation);
      return this.$store.getters.getLoggedUserInformation.avatarReference;
    },
     getNextReservationStatus() {
      let status = this.reservation.status.id;

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
    /*
    findAvatar(id){
      let userAvatar =this.users.find(user => user.id == id)
      return userAvatar.avatarReference

    }*/
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
<template>
  <div id="divAdminReservations" style="width: 400px; padding-left:0px;margin:1.5%">
    <b-container
      id="adminReservationCard"
      style="background-color: white; width: 400px; height: 220px;padding-left:10px"
      fluid
    >
      <b-row no-gutters>
        <b-col> <br /></b-col>
      </b-row>

      <b-row >
        <b-col cols="4" style="min-width: max-content;padding-right:0">
          <h6>Reserva {{ reservation.id }}</h6>
        </b-col>
        <b-col cols="4" style="font-size: 13px;font-family:Fredoka regular; min-width: max-content;padding-right:0;">
          <p><b>Data:</b> {{ getNextReservationDate() }}</p>
        </b-col>
        <b-col cols="3" style="font-size: 13px;font-family:Fredoka regular; min-width: max-content;padding-right:0;padding-left:0">
          <p><b>Preço:</b> {{getReservationPrice()}}€</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4" style="min-width: max-content;padding-right:0">
          <h6 :style="statusStyleColor">{{getNextReservationStatus()}}</h6>
        </b-col>
        <b-col cols="4" style="font-size: 13px;font-family:Fredoka regular; min-width: max-content;padding-right:0;"> 
            <p><b>Hora:</b> {{getNextReservationTime()}}H</p>
        </b-col>
        <b-col cols="3" style="font-size: 13px; min-width: max-content;padding-right:0;padding-left:0" >
            <span style="font-family:Fredoka light "><b>Estado:</b> </span>
            <span style="font-family:Fredoka light " :style="paymentStyleColor"> {{checkPayment()}}</span>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col style="font-size: 13px;">
            <p><b>Montante pago:</b> {{getAmountReceived()}}€</p>
        </b-col>
        <b-col>
            <p><b>Mesa X</b></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="font-size: 13px;">
            <p><b>Preço Suplementos:</b> {{getSupplements()}}€</p>
        </b-col>
        <b-col>
            <p>{{isTableCommunal()}}</p>
        </b-col>
      </b-row>
      <b-row >
        <b-col style="font-size: 13px;">
            <p><b>Nº de participantes:</b> {{getParticipantsCount()}}</p>
        </b-col>
        <b-col>
            <div
        id="expandNextReservation2"
        @click="getReservationById(reservation.id)"
      
      >
        <b-img
          id="expandNextReservationImg2"
          width="35px"
          height="35px"
          src="../assets/icons/expand-arrows48.png"
        ></b-img>
        
      </div>

        </b-col>
      </b-row>
      

      
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ReservationsAdmin",
  props: {
    reservation: Object,
  },
  data() {
    return {
      users: [],
      avatar: "",
      statusStyleColor:{
        color:'black'
      },
      payment:"",
       paymentStyleColor:{
        color:'black'
      },
    };
  },

  created: function () {
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
    async getReservationById(id) {
     await this.$store.dispatch("getReservationById", id);
      this.$bvModal.show("adminEditModal");
      
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
    getReservationPrice(){
        const price = this.reservation.reservationPrice
        return price
    },
    checkPayment(){
        const amountReceived = Number(this.reservation.amountReceived)
        const price = Number(this.reservation.reservationPrice)
        let string = ""
        if(amountReceived == "0.00"){
            string = "Por pagar"
            this.paymentStyleColor.color = "red"
            return string
        }
        else if(amountReceived >= price){
            string = "Pago"
            this.paymentStyleColor.color = "green"
            return string
        }
        else if(amountReceived < price){
            string = "Em falta"
            this.paymentStyleColor.color = "orange"
            return string
        }

    },
    getAmountReceived(){
        const amountReceived = this.reservation.amountReceived
        return amountReceived
    },
    getSupplements(){
        const supplements = this.reservation.supplementsPrice;
        if(supplements == null){
            return "0,00"
        }
        else{
            return supplements
        }
    },
    getParticipantsCount(){
        const participants = this.reservation.participants.length
        return participants
    },
    isTableCommunal(){
        const isTableCommunal = this.reservation.isTableCommunal
        if(isTableCommunal==true){
            return "Partilhada"
        }
        else if(isTableCommunal == false){
            return "Privada"
        }
    }
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
<template>
  <div id="reservations" style="margin: auto">
    <div v-if="!isLoggedAdmin()">
      <br /><br />
      <b-container style="margin-left: 2%">
        <b-row>
          <b-col>
            <label for="select" style="font-family: Fredoka Medium"
              >Ordem</label
            >
          </b-col>
          <b-col>
            <label for="select2" style="font-family: Fredoka Medium"
              >Estado</label
            >
          </b-col>
        </b-row>

        <b-row
          class="justify-content-md-left"
          style="font-family: Fredoka Regular"
        >
          <b-col>
            <b-form-select
              id="select"
              v-model="optionSortSelected"
              :options="optionsSort"
            >
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              id="select2"
              :options="options"
              required
              v-model="reservationStatusSelect"
            >
              <template #first>
                <b-form-select-option value="">TODAS</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <label for="select3" style="font-family: Fredoka Medium"
              >Data</label
            >
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-datepicker
              style="font-family: Fredoka Regular"
              id="example-datepicker"
              placeholder="YYYY-MM-DD"
              class="mb-2"
              :max="maxDate"
              v-model="minDate"
              hide-header
              no-flip
              weekday-header-format="narrow"
            ></b-form-datepicker>
          </b-col>
          <b-col>
            <b-form-datepicker
              :disabled="!isDate1Picked()"
              id="example-datepicker2"
              placeholder="YYYY-MM-DD"
              class="mb-2"
              :min="minDate"
              v-model="maxDate"
              hide-header
              no-flip
              weekday-header-format="narrow"
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
    <div v-if="isLoggedAdmin()">
      <b-container style="margin-left: 2%">
        <b-row>
          <b-col>
            <label for="select" style="font-family: Fredoka Medium"
              >Ordem</label
            >
          </b-col>
          <b-col>
            <label for="select2" style="font-family: Fredoka Medium"
              >Estado</label
            >
          </b-col>
        </b-row>

        <b-row
          class="justify-content-md-left"
          style="font-family: Fredoka Regular"
        >
          <b-col>
            <b-form-select
              id="select"
              v-model="optionSortSelected"
              :options="optionsSort"
            >
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              id="select2"
              :options="options"
              required
              v-model="reservationStatusSelect"
            >
              <template #first>
                <b-form-select-option value="">TODAS</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <label for="select3" style="font-family: Fredoka Medium"
              >Data</label
            >
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-datepicker
              style="font-family: Fredoka Regular"
              id="example-datepicker"
              placeholder="YYYY-MM-DD"
              class="mb-2"
              :max="maxDate"
              v-model="minDate"
              hide-header
              no-flip
              weekday-header-format="narrow"
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
              hide-header
              width=
              no-flip
              weekday-header-format="narrow"
            ></b-form-datepicker>
          </b-col>
        </b-row>
      </b-container>
      <hr class="rounded" />
      <b-container fluid>
        <h1 v-if="!getReservations.length">Não Foram Encontrados Reservas!</h1>
        <b-row style="margin-right: 5%; margin-left: 5%">
          <ReservationsAdmin
            v-for="myReservation in getReservations"
            :key="myReservation.id"
            :reservation="myReservation"
          />
        </b-row>
      </b-container>
      ADMIN
      

      <b-modal id="adminEditModal" @show="activeReservationData()"
       v-if="Number.isInteger(getActiveReservation().id)"
       centered
        hide-footer
       >
         <b-form @submit.prevent="">
          <b-row >
            <b-col >
             <h6>Reserva {{this.getActiveReservation().id}}</h6>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col>
             <b-form-select
              id="select3"
              :options="options"
              required
              v-model="frm.status"
            >
            </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-input v-model="frm.date" readonly></b-form-input>
            </b-col>
             <b-col>
              <b-form-input v-model="frm.price" readonly></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-input v-model="frm.time" readonly></b-form-input>
            </b-col>
             <b-col>
              <b-form-input v-model="frm.isPayed" readonly></b-form-input>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col>
              <p>Mesa X</p>
              <p>{{isTableCommunal()}}</p>
            </b-col>
          </b-row>
          
          <b-row>
            <b-col cols="6">
                <b-form-input type="number" ></b-form-input>
            </b-col>
            <b-col><b-button>+</b-button></b-col>
            <b-col><b-button>-</b-button></b-col>
          
          </b-row>
          <br>

          <b-row>
             <div style="margin-top: 5%;width:100%">
              <b-row no-gutters  v-b-toggle="'collapse-1'" @click="changeIcon()" style="max-width:max-content;margin:auto" v-if="this.icon">
                <b-col style="max-width:max-content">
                  <h6 style="min-width:max-content">Pratos </h6>
                </b-col>
                <b-col>
                  <b-icon style="margin-bottom:20%;margin-left:20%" :icon=this.icon ></b-icon>
                </b-col>
              </b-row>

          
          <b-collapse id="collapse-1">
            <b-container fluid>
              <b-row style="margin-right: 5%; margin-left: 5%;">
                <div
                  v-for="participant in getActiveReservation().participants"
                  :key="participant.id"
                  style="margin-right: 5%; margin-left: 5%; margin-top: 1%;"
                >
                  <h6 style="text-align: center">{{ participant.reservationPrice }}€</h6>

                  <b-container fluid
                   v-for="dish in participant.dishes"
                  :key="dish.id"
                  >
                 
                  <p style="font-size:12px;">{{dish.name}}</p>
                  </b-container>
                  
                </div>
              </b-row>
            </b-container>
          </b-collapse>
        

        </div>

          </b-row>
          

         </b-form>
        

      </b-modal>
    </div>
  </div>
</template>

<script>
import ReservationsCard from "../components/RerservationsCard.vue";
import ReservationsAdmin from "../components/ReservationsAdmin.vue"

export default {
  name: "Reservations",
  components: {
    ReservationsCard,
    ReservationsAdmin
  },
  data() {
    return {
      ordem: null,
      estado: null,
      users: [],
      icon:"arrow-down",
      reservationStatusSelect: "",
      options: [
        { value: 1, text: "Pendente" },
        { value: 2, text: "Aprovada" },
        { value: 3, text: "Rejeitada" },
        { value: 4, text: "Cancelada" },
        { value: 5, text: "Completada" },
        { value: 6, text: "Sem Comparência" },
      ],
      
      minDate: "",
      maxDate: "",

      optionSortSelected: 1,
      optionsSort: [
        {
          value: 1,
          text: "Mais Recentes",
        },
        {
          value: -1,
          text: "Mais Antigos",
        },
      ],
      statusStyleColor:{
        color:"black"
      },
      paymentStyleColor:{
        color:"black"
      },
      
      frm:{
        id:"",
        status:"",
        date:"",
        price:"",
        time:"",
        isPayed:"",
        table:"",
        isTableCommunal:"",
        participants:"",
        participantsDishes:"",
        supplements:"",
      },
    
    
    };
  },
  created: function () {
    this.PrepareData();
  },
  methods: {
    async PrepareData() {
      if (!this.isLoggedAdmin()) {
        await this.$store.dispatch("getUserReservations");
      } else if (this.isLoggedAdmin()) {
        let today = new Date().toISOString().slice(0, 10)
        this.minDate = today;

        await this.$store.dispatch("getAllReservations");
      }
    },
    getActiveReservation(){
      return this.$store.getters.getActiveReservation;
    },
    activeReservationData() {
      console.log("coiso")
      let reservation =  this.getActiveReservation()
      this.frm.id= reservation.id;
      this.frm.status=this.getActiveReservationStatus()
      this.frm.date= this.getNextReservationDate()
      this.frm.time = this.getNextReservationTime()
      this.frm.isPayed = this.checkPayment()
      this.frm.price=reservation.reservationPrice;
      this.frm.isTableCommunal = this.isTableCommunal()
      
     
      this.frm.participants = reservation.participants;
      this.frm.supplements = reservation.supplements;
      return reservation

      



    },
   
    isDate1Picked() {
      if (this.minDate == "" || this.minDate == null) {
        return false;
      } else {
        return true;
      }
    },
    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },
     getActiveReservationStatus() {
      let status = this.getActiveReservation().status.id
      
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
     checkPayment(){
      let amountReceived = this.getActiveReservation().amountReceived
      let price = this.getActiveReservation().reservationPrice
        
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
     getNextReservationDate() {
      const date = this.getActiveReservation().startDate.slice(0, 10);
      return date;
    },

    getNextReservationTime() {
      const time = this.getActiveReservation().startDate.slice(11, 16);
      return time;
    },
    isTableCommunal(){
        let isTableCommunal = this.getActiveReservation().isTableCommunal
        
        if(isTableCommunal==true){
            return "Partilhada"
        }
        else if(isTableCommunal == false){
            return "Privada"
        }
    },
    changeIcon(){
      if(this.icon=="arrow-up"){
        this.icon="arrow-down"
       
      }
       else if(this.icon=="arrow-down"){
        this.icon="arrow-up"
       
      }
    },
  },
  computed: {
    
    getReservations() {
      //return this.$store.getters.getUserReservations;

      return this.$store.getters.getUserReservationsFiltered(
        this.minDate,
        this.maxDate,
        this.reservationStatusSelect,
        this.optionSortSelected
      );
    },
  },
};
</script>

<style>
</style>
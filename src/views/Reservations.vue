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
          <b-col id="reservationsDateBigScreens">
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
        <b-row id="reservationsDateSmallScreens" style="display: none">
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
        <b-row id="reservationsGroup" style="margin-right: 5%; margin-left: 5%">
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
          <b-col id="reservationsDateBigScreens">
            <b-form-datepicker
              :disabled="!isDate1Picked()"
              id="example-datepicker2"
              placeholder="YYYY-MM-DD"
              class="mb-2"
              :min="minDate"
              v-model="maxDate"
              hide-header
              width="no-flip"
              weekday-header-format="narrow"
            ></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row id="reservationsDateSmallScreens" style="display: none">
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
        <b-row
          id="groupAdminReservations"
          style="margin-right: 5%; margin-left: 5%"
        >
          <ReservationsAdmin
            v-for="myReservation in getReservations"
            :key="myReservation.id"
            :reservation="myReservation"
          />
        </b-row>
      </b-container>

      <b-modal
        id="adminEditModal"
        ref="modal"
        v-if="Number.isInteger(getActiveReservation().id)"
        @show="activeReservationData()"
        centered
        hide-footer
      >
        <b-form @submit.prevent="">
          <div id="form1" v-if="this.form1">
            <b-row>
              <b-col>
                <h4>Reserva {{ this.frm.id }}</h4>
              </b-col>
            </b-row>

            <b-row style="font-family: Fredoka Regular">
              <b-col>
                <b-form-select
                  id="select3"
                  v-model="frm.status"
                  :options="options"
                  required
                >
                </b-form-select>
              </b-col>
              <b-col>
                <b-button
                  style="
                    min-width: max-content;
                    background-color: #fca311;
                    border: none;
                    font-family: Fredoka Regular;
                  "
                  @click="updateReservationStatus()"
                  >Alterar</b-button
                >
              </b-col>
             
            </b-row>
            <br>
             <b-alert v-model="showStatusAlert" dismissible>
                {{ statusAlertMsg }}
              </b-alert>
            <br />
            <b-row style="font-family: Fredoka Regular">
              <b-col>
                <b-form-input v-model="frm.date" readonly></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="frm.price" readonly></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row style="font-family: Fredoka Regular">
              <b-col>
                <b-form-input v-model="frm.time" readonly></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="frm.isPayed" readonly></b-form-input>
              </b-col>
            </b-row>
            <br />

            <b-row style="font-family: Fredoka Regular">
              <b-col class="text-center"> Mesa {{ isTableCommunal() }} </b-col>
            </b-row>
            <br />

            <b-row style="font-family: Fredoka Regular">
              <b-col cols="6">
                <b-form-input
                  type="number"
                  step="0.50"
                  min="0.00"
                  max="50.00"
                  v-model="frm.addSupplements"
                  placeholder="Suplementos (€)"
                  :disabled="this.frm.paid"
                ></b-form-input>
              </b-col>
              <b-col
                ><b-button
                  style="
                    min-width: max-content;
                    background-color: #fca311;
                    border: none;
                    font-family: Fredoka Regular;
                  "
                  @click="incrementSupplements()"
                  :disabled="this.frm.paid"
                  >Adicionar</b-button
                ></b-col
              >
            </b-row>
            <br>
             <b-alert v-model="showSupplementsAlert" dismissible>
                {{ supplementsAlertMsg }}
              </b-alert>

            <hr />

            <b-row>
              <div style="margin-top: 2%; width: 100%">
                <b-row
                  no-gutters
                  v-b-toggle="'collapse-1'"
                  @click="changeIcon()"
                  style="max-width: max-content; margin: auto"
                  v-if="this.icon"
                >
                  <b-col style="max-width: max-content">
                    <h6 style="min-width: max-content">Pratos</h6>
                  </b-col>
                  <b-col>
                    <b-icon
                      style="margin-bottom: 20%; margin-left: 20%"
                      :icon="this.icon"
                    ></b-icon>
                  </b-col>
                </b-row>

                <b-collapse id="collapse-1">
                  <!--
                <b-container fluid>
                  <b-row style="margin-right: 5%; margin-left: 5%">
                    <div
                      v-for="participant in getActiveReservation().participants"
                      :key="participant.id"
                      style="margin-right: 5%; margin-left: 5%; margin-top: 1%"
                    >
                      <h6 style="text-align: center">
                        {{ participant.reservationPrice }}€
                      </h6>

                      <b-container
                        fluid
                        v-for="dish in participant.dishes"
                        :key="dish.id"
                      >
                        <p style="font-size: 12px">{{ dish.name }}</p>
                      </b-container>
                    </div>
                  </b-row>
                </b-container>
                -->

                  <b-container>
                    <div v-for="dish in this.getStarterDishes()" :key="dish[0]">
                      <b-row>
                        <b-col cols="8">
                          {{ dish[0] }}
                        </b-col>
                        <b-col> X {{ dish[1] }} </b-col>
                      </b-row>
                    </div>
                    <hr class="rounded" />
                    <div v-for="dish in this.getMainDishes()" :key="dish[0]">
                      <b-row>
                        <b-col cols="8">
                          {{ dish[0] }}
                        </b-col>
                        <b-col> X {{ dish[1] }} </b-col>
                      </b-row>
                    </div>
                    <hr class="rounded" />
                    <div v-for="dish in this.getDessertDishes()" :key="dish[0]">
                      <b-row>
                        <b-col cols="8">
                          {{ dish[0] }}
                        </b-col>
                        <b-col> X {{ dish[1] }} </b-col>
                      </b-row>
                    </div>
                  </b-container>
                </b-collapse>
              </div>
            </b-row>
            <br />
            <br />
            <b-row>
              <b-button
                style="
                  margin: auto;
                  display: block;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka Regular;
                "
                @click="nextForm()"
                :disabled="this.frm.paid"
                >Pagamento</b-button
              >
            </b-row>
            
          </div>
          <!--Reservation Payment-->
          <div id="form2" v-if="this.form2">
            <b-row>
              <b-button
                style="
                  margin-left: 2%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka Regular;
                "
                @click="previousForm()"
                >Voltar</b-button
              >
            </b-row>
            <br />
            <b-row style="font-family: Fredoka Regular">
              <b-col class="text-center">Suplementos </b-col>
              <b-col class="text-center">Valor Total</b-col>
              <b-col class="text-center">Montante Pago</b-col>
            </b-row>
            <b-row>
              <b-col class="text-center" v-if="this.frm.supplements != null"
                >{{ this.frm.supplements }}€</b-col
              >
              <b-col class="text-center"
                >{{
                  Number(this.frm.price) + Number(this.frm.supplements)
                }}€</b-col
              >
              <b-col class="text-center">{{ this.frm.amountReceived }}€</b-col>
            </b-row>

            <br />
            <b-row>
              <b-col> </b-col>
              <b-col></b-col>
              <b-col></b-col>
            </b-row>

            <hr />
            <div
              v-for="participant in this.frm.participants"
              :key="participant.id"
            >
              <b-row no-gutters>
                <b-col cols="2">
                  <b-avatar-group size="40px">
                    <b-avatar :src="participant.user.avatarReference">
                    </b-avatar>
                  </b-avatar-group>
                </b-col>

                <b-col style="font-family: Fredoka Regular">{{
                  participant.name
                }}</b-col>
              </b-row>

              <b-row style="font-family: Fredoka Regular; margin-top: 2%">
                <b-col class="text-center">Valor da Reserva</b-col>
                <b-col>Suplementos</b-col>
                <b-col></b-col>
              </b-row>
              <b-row>
                <b-col class="text-center">
                  <p>{{ participant.reservationPrice }}€</p>
                </b-col>
                <b-col class="text-center">
                  <b-form-input type="number"
                    @input="updateValue(participant.id)"
                    v-model="participant.supplements"
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-button
                    style="
                      min-width: max-content;
                      background-color: #fca311;
                      border: none;
                      font-family: Fredoka Regular;
                    "
                    @click="
                      payment(
                        participant.id,
                        participant.reservationPrice,
                        participant.supplements
                      )
                    "
                    >Pagar</b-button
                  >
                </b-col>
              </b-row>
              <b-alert style="margin-top:2%" v-model="showPaymentAlert" dismissible>
                {{ paymentAlertMsg }}
              </b-alert>
              <hr />
            </div>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ReservationsCard from "../components/RerservationsCard.vue";
import ReservationsAdmin from "../components/ReservationsAdmin.vue";

export default {
  name: "Reservations",
  components: {
    ReservationsCard,
    ReservationsAdmin,
  },
  data() {
    return {
      ordem: null,
      estado: null,
      users: [],
      icon: "arrow-down",
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
      statusStyleColor: {
        color: "black",
      },
      paymentStyleColor: {
        color: "black",
      },

      frm: {
        id: "",
        status: 1,
        date: "",
        price: "",
        time: "",
        isPayed: "",
        paid: false,
        table: "",
        isTableCommunal: "",
        participants: "",
        participantsDishes: "",
        supplements: "",
        addSupplements: null,
        amountReceived: "",
      },
      starterArray: {},
      mainArray: {},
      dessertArray: {},
      form1: true,
      form2: false,
      supplements: "",
      showStatusAlert: false,
      statusAlertMsg: "",
      showSupplementsAlert: false,
      supplementsAlertMsg: "",
      showPaymentAlert: false,
      paymentAlertMsg: "",
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
        let today = new Date().toISOString().slice(0, 10);
        this.minDate = today;

        await this.$store.dispatch("getAllReservations");
        await this.$store.dispatch("getAllDishes");
      }
    },
    nextForm() {
      this.form1 = false;
      this.form2 = true;
    },
    previousForm() {
      this.form1 = true;
      this.form2 = false;
    },
    getActiveReservation() {
      return this.$store.getters.getActiveReservation;
    },

    activeReservationData() {
      this.form1 = true;
      this.form2 = false;
      let reservation = this.getActiveReservation();

      this.frm.id = reservation.id;
      this.frm.status = this.getActiveReservationStatus();
      this.frm.date = this.getNextReservationDate();
      this.frm.time = this.getNextReservationTime();
      this.frm.isPayed = this.checkPayment();
      this.frm.price = reservation.reservationPrice;
      this.frm.isTableCommunal = this.isTableCommunal();
      this.frm.amountReceived = reservation.amountReceived;
      if (
        Number(reservation.amountReceived) >=
        Number(reservation.reservationPrice)
      ) {
        this.frm.paid = true;
      } else {
        this.frm.paid = false;
      }

      this.frm.participants = reservation.participants;
      for (let i = 0; i < reservation.participants.length; i++) {
        this.frm.participants[i].supplements = "0.00";
        this.frm.participants[i].fullReservationPrice = Number(
          reservation.participants[i].reservationPrice
        );
      }

      if (reservation.supplementsPrice != null) {
        this.frm.supplements = reservation.supplementsPrice;
      } else {
        this.frm.supplements = "0.00";
      }

      return reservation;
    },
    clearData() {
      this.frm.id = "";
      this.frm.status = "";
      this.frm.date = "";
      this.frm.time = "";
      this.frm.isPayed = "";
      this.frm.price = "";
      this.frm.isTableCommunal = "";

      this.frm.participants = "";
      this.frm.supplements = "";
      this.frm.amountReceived = "";
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
      let status = this.getActiveReservation().status.id;

      //let statusColor = this.$refs.nextReservationStatus

      let statusString = "";
      switch (status) {
        case 1:
          statusString = 1;
          this.statusStyleColor.color = "red";
          // console.log(statusColor)

          break;

        case 2:
          statusString = 2;
          this.statusStyleColor.color = "green";
          break;
        case 3:
          statusString = 3;
          this.statusStyleColor.color = "red";
          break;
        case 4:
          statusString = 4;
          this.statusStyleColor.color = "red";
          break;
        case 5:
          statusString = 5;
          this.statusStyleColor.color = "green";
          break;
        case 6:
          statusString = 6;
          this.statusStyleColor.color = "red";
          break;
        default:
          statusString = "Erro";
      }
      console.log(status);
      return statusString;
    },
    checkPayment() {
      let amountReceived = this.getActiveReservation().amountReceived;
      let price = this.getActiveReservation().reservationPrice;

      let string = "";
      if (amountReceived == "0.00") {
        string = "Por pagar";
        this.paymentStyleColor.color = "red";
        return string;
      } else if (amountReceived >= price) {
        string = "Pago";

        this.paymentStyleColor.color = "green";
        return string;
      } else if (amountReceived < price) {
        string = "Em falta";
        this.paymentStyleColor.color = "orange";
        return string;
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
    isTableCommunal() {
      let isTableCommunal = this.getActiveReservation().isTableCommunal;

      if (isTableCommunal == true) {
        return "Partilhada";
      } else if (isTableCommunal == false) {
        return "Privada";
      }
    },
    changeIcon() {
      if (this.icon == "arrow-up") {
        this.icon = "arrow-down";
      } else if (this.icon == "arrow-down") {
        this.icon = "arrow-up";
      }
    },
    getStarterDishes() {
      let reservation = this.getActiveReservation();
      let starterArray = [];
      let dish = [];

      for (let i = 0; i < reservation.participants.length; i++) {
        let dishes = reservation.participants[i].dishes;

        let starter = dishes.filter((starter) => starter.courseId === 1);
        starterArray.push(starter[0].id);
      }
      starterArray = this.countDish(starterArray);

      starterArray = Object.entries(starterArray);
      console.log(starterArray);

      for (let i = 0; i < starterArray.length; i++) {
        dish.push([
          this.getDishById(Number(starterArray[i][0]))[0].name,
          starterArray[i][1],
        ]);
      }
      return dish;
    },
    getMainDishes() {
      let reservation = this.getActiveReservation();
      let mainArray = [];
      let dish = [];

      for (let i = 0; i < reservation.participants.length; i++) {
        let dishes = reservation.participants[i].dishes;
        let main = dishes.filter((main) => main.courseId === 2);
        mainArray.push(main[0].id);
      }
      mainArray = this.countDish(mainArray);
      mainArray = Object.entries(mainArray);
      for (let i = 0; i < mainArray.length; i++) {
        dish.push([
          this.getDishById(Number(mainArray[i][0]))[0].name,
          mainArray[i][1],
        ]);
      }
      return dish;
    },

    getDessertDishes() {
      let reservation = this.getActiveReservation();

      let dessertArray = [];
      let dish = [];

      for (let i = 0; i < reservation.participants.length; i++) {
        let dishes = reservation.participants[i].dishes;

        let dessert = dishes.filter((dessert) => dessert.courseId === 3);
        dessertArray.push(dessert[0].id);
      }

      dessertArray = this.countDish(dessertArray);
      dessertArray = Object.entries(dessertArray);
      for (let i = 0; i < dessertArray.length; i++) {
        dish.push([
          this.getDishById(Number(dessertArray[i][0]))[0].name,
          dessertArray[i][1],
        ]);
      }
      return dish;
    },
    getDishById(id) {
      return this.$store.getters.getDish(id);
    },
    countDish(array) {
      var count = {};
      array.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });
      return count;
    },
    getDishName(array, i) {
      return Object.keys(array)[i];
    },
    getDishCount(array, i) {
      return array[Object.keys(array)[i]];
    },
    async updateReservationStatus() {
      let reservation = {
        reservationStatusId: this.frm.status,
        statusId: this.frm.status,
      };
      /*
      if (confirm("Quer alterar os dados?")) {
        await this.$store.dispatch("updateReservationStatus", reservation);
        await this.$store.dispatch("getAllReservations");
      }*/

      this.$bvModal
        .msgBoxConfirm("Quer alterar o estado da reserva?", {
          title: "Alteração do estado",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Confirmo",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$store.dispatch("updateReservationStatus", reservation);
            this.$store.dispatch("getAllReservations");
            this.statusAlertMsg = "Estado alterado!";
            this.showStatusAlert = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.statusAlertMsg = "Não foi possivel alterar o estado";
          this.showStatusAlert = true;
        });
    },
    async incrementSupplements() {
      let supplements = parseFloat(
        (Math.round(this.frm.addSupplements * 100) / 100).toFixed(2)
      );
      let reservation = {
        supplements: (Math.round(supplements * 100) / 100).toFixed(2),
      };
      console.log(supplements);
      await this.$store.dispatch("incrementSupplements", reservation);
      this.supplementsAlertMsg="Suplemento adicionado!"
      this.showSupplementsAlert =true
      let total = Number(this.frm.supplements) + Number(this.frm.addSupplements)
      this.frm.supplements = total
    },
    getIndexOf(id) {
      let index = this.frm.participants.findIndex(
        (participant) => participant.id == id
      );
      return index;
      //this.frm.participants[index].supplements = this.$refs.myInput.value
    },
    updateValue(id) {
      this.frm.participants[this.getIndexOf(id)].fullReservationPrice =
        Number(this.frm.participants[this.getIndexOf(id)].reservationPrice) +
        Number(this.frm.participants[this.getIndexOf(id)].supplements);
      return this.frm.participants[this.getIndexOf(id)].fullReservationPrice;
    },
    async payment(participantId, reservationPrice, supplements) {
      let amountPaid =
        parseFloat((Math.round(reservationPrice * 100) / 100).toFixed(2)) +
        parseFloat((Math.round(supplements * 100) / 100).toFixed(2));

      let payment = {
        amountPaid: (Math.round(amountPaid * 100) / 100).toFixed(2),
        id: participantId,
      };

      console.log(payment);
      await this.$store.dispatch("paymentByParticipant", payment);

      this.paymentAlertMsg="Pagamento efetuado!"
      this.showPaymentAlert = true

      let total = Number(this.frm.amountReceived) + Number(amountPaid)
      console.log(total)
      this.frm.amountReceived = total

      //CONCLUIR SE ATINGIR O VALOR TOTAL
      if (
        Number(amountPaid) + Number(this.frm.amountReceived) >=
        Number(this.frm.price) + Number(this.frm.supplements)
      ) {
        let reservation = {
          reservationStatusId: 5,
          statusId: 5,
        };

        await this.$store.dispatch("updateReservationStatus", reservation);
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
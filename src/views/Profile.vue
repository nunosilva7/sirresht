<template>
  <div class="profile">
    <div>
      <h1>Bem Vindo, {{ getLoggedUserInformation.firstName }}</h1>

      <b-button v-b-modal.reservationModal>adicionar</b-button>

      <b-container>
        <h1>Menu Destaque</h1>
        <b-row>
          <b-card-group>
            <NextMenuCard :key="getNextMenu.id" :nextMenu="getNextMenu" />
          </b-card-group>
        </b-row>
      </b-container>

      <b-modal id="reservationModal" hide-footer>
        <b-form @submit.prevent="Reservation()">
          <div id="form1" v-if="this.form1">
            <b-row>
              <b-col md="auto">
                <b-calendar
                  v-model="date"
                  :date-disabled-fn="dateDisabled"
                  @context="onContext"
                  locale="pt-PT"
                  width="400px"
                  hide-header
                  required
                ></b-calendar>
              </b-col>
              <b-col>
                <p>
                  Data: <b>'{{ date }}'</b>
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    id="radio-slots"
                    v-model="selected"
                    :options="options"
                    :aria-describedby="ariaDescribedby"
                    name="radio-options-slots"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <div>
                <b-form-select
                  v-if="this.selected == 1"
                  v-model="selectedTime"
                  :options="optionsTime"
                ></b-form-select>
                <b-form-select
                  v-else
                  v-model="selectedTime2"
                  :options="optionsTime2"
                >
                </b-form-select>

                <div class="mt-3" v-if="this.selected == 1">
                  Selected: <strong>{{ selectedTime }}</strong>
                </div>
                <div class="mt-3" v-else>
                  Selected: <strong>{{ selectedTime2 }}</strong>
                </div>
              </div>
            </b-row>
          </div>
          <div id="form2" v-if="this.form2">
            <p>FORM2</p>

            <ul v-for="participant in this.participants" :key="participant.id">
              <li>
                {{ participant.firstName + " " + participant.lastName }}
                <div v-if="getLoggedUserInformation.id != participant.id">
                  <button @click="removeParticipant(participant.id)">
                    fechar
                  </button>
                </div>
              </li>
            </ul>

            <b-row class="justify-content-md-center">
              <b-button v-b-modal.modal-multi-3>participantes</b-button>
            </b-row>
          </div>
          <div id="form3" v-if="this.form3">
            <p>FORM3</p>
          </div>
          <div id="form4" v-if="this.form4">
            <p>FORM4</p>

            <div
              id="participantsMenu"
              v-for="participant in this.participants"
              :key="participant.id"
            >
              <b-row>
                <b-col>
                  <h6>
                    {{ participant.firstName + " " + participant.lastName }}
                  </h6>
                </b-col>
                <b-col>
                  <button
                    v-b-modal.modal-multi-4
                    @click="editParticipant(participant.id)"
                  >
                    expandir
                  </button>
                </b-col>
              </b-row>

              <div v-if="participant.dishesIds != null">
                <p>{{ getDish(participant.dishesIds[0]) }}</p>
                <p>{{ getDish(participant.dishesIds[1]) }}</p>
                <p>{{ getDish(participant.dishesIds[2]) }}</p>
              </div>
              <div v-else>
                <p>nada</p>
              </div>
            </div>
          </div>
          <div id="form5" v-if="this.form5"></div>

          <b-row>
            <div class="row px-5">
              <label>{{ formError }}</label>
            </div>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-col>
              <b-button @click="showPreviousForm()">back</b-button>
            </b-col>
            <b-col>
              <b-button @click="showNextForm()" v-if="!this.form5"
                >next</b-button
              >
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center"> </b-row>

          <b-row class="justify-content-md-center">
            <b-button type="submit" variant="danger" v-if="this.form5"
              >Concluir</b-button
            >
          </b-row>
          <br />
        </b-form>
      </b-modal>

      <b-modal id="modal-multi-3" size="sm" title="Third Modal" ok-only>
        <b-form @submit.prevent="" id="f">
          <b-row>
            <b-col>
              <b-form-input v-model="email" placeholder="Escreve o email">
              </b-form-input>
            </b-col>
            <b-col>
              <b-button @click="checkParticipant()">check</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
      <b-modal id="modal-multi-4" size="lg" title="Fourth Modal" ok-only>
        <b-form @submit.prevent="">
          <b-card no body>
            <b-tabs card>
              <b-tab
                v-for="menu in getMenusByDate"
                :key="menu.id"
                :title="'Menu ' + menu.id"
                @click="clearOptions()"
              >
              <b-form  @submit.prevent="pickDishes(participant_id, menu.id)">
                <b-row>
                  <div>
                    <h5>Menu #{{ menu.id }}</h5>
                    <h6>Entrada</h6>
                    <b-form-group v-slot="{ ariaDescribedby }">
                      <ul>
                        <b-form-radio-group id="starter" required>
                          <li>
                            <b-form-radio
                              v-model="starter"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="0"
                              >{{ menuStarter(menu.id)[0].name }}</b-form-radio
                            >
                          </li>
                          <li>
                            <b-form-radio
                              v-model="starter"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="1"
                              >{{ menuStarter(menu.id)[1].name }}</b-form-radio
                            >
                          </li>
                        </b-form-radio-group>
                      </ul>
                    </b-form-group>

                    <h6>Prato principal</h6>
                    <b-form-group v-slot="{ ariaDescribedby }" required>
                      <ul>
                        <b-form-radio-group id="main" required>
                          <li>
                            <b-form-radio
                              v-model="main"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="0"
                              required
                            >
                              {{ menuMain(menu.id)[0].name }}</b-form-radio
                            >
                          </li>
                          <li>
                            <b-form-radio
                              v-model="main"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="1"
                              required
                              >{{ menuMain(menu.id)[1].name }}</b-form-radio
                            >
                          </li>
                        </b-form-radio-group>
                      </ul>
                    </b-form-group>
                    <h6>Sobremesa</h6>
                    <b-form-group v-slot="{ ariaDescribedby }">
                      <ul>
                        <b-form-radio-group id="dessert">
                          <li>
                            <b-form-radio
                              v-model="dessert"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="0"
                            >
                              {{ menuDessert(menu.id)[0].name }}</b-form-radio
                            >
                          </li>
                          <li>
                            <b-form-radio
                              v-model="dessert"
                              :aria-describedby="ariaDescribedby"
                              name="some-radios"
                              value="1"
                              >{{ menuDessert(menu.id)[1].name }}</b-form-radio
                            >
                          </li>
                        </b-form-radio-group>
                      </ul>
                      <b-button type="submit" 
                        >adicionar</b-button
                      >
                    </b-form-group>
                  </div>
                </b-row>
                </b-form>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NextMenuCard from "../components/NextMenuCard.vue";

// @ is an alias to /src

export default {
  name: "Profile",
  components: {
    NextMenuCard,
  },

  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // today
    const minDate = new Date(today);

    // 15th in two months
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(31);

    return {
      test: "",
      minDate: minDate,
      maxDate: maxDate,
      email: "",
      participants: [],
      participant_id: "",
      starter: "",
      main: "",
      dessert: "",
      dishes: [],

      selected: "1",
      options: [
        { text: "Almoço", value: "1" },
        { text: "Jantar", value: "2" },
      ],
      selectedTime: "12:00",
      optionsTime: [
        { value: "12:00", text: "12:00H" },
        { value: "12:30", text: "12:30H" },
        { value: "13:00", text: "13:00H" },
        { value: "13:30", text: "13:30H" },
        { value: "14:00", text: "14:00H" },
      ],
      selectedTime2: "20:00",
      optionsTime2: [
        { value: "20:00", text: "20:00H" },
        { value: "20:30", text: "20:30H" },
        { value: "21:00", text: "21:00H" },
        { value: "21:30", text: "21:30H" },
        { value: "22:00", text: "22:00H" },
      ],
      date: null,
      context: null,

      form1: true,
      form2: false,
      form3: false,
      form4: false,
      form5: false,
      formError: "",
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  created: function () {
    this.PrepareData();
  },

  methods: {
    async PrepareData() {
      await this.$store.dispatch("getAllMenus");
      await this.$store.dispatch("getAllDishes");
      this.participants.push(this.getLoggedUserInformation);
    },
    clearOptions() {
      (this.starter = ""), (this.main = ""), (this.dessert = "");
    },
    editParticipant(id) {
      this.participant_id = id;
    },

    pickDishes(participant_id, menu_id) {
      let starterId;
      let mainId;
      let dessertId;

      if (this.starter === "0") {
        starterId = this.menuStarter(menu_id)[0].id;
      }
      if (this.starter === "1") {
        starterId = this.menuStarter(menu_id)[1].id;
      }
      if (this.main === "0") {
        mainId = this.menuMain(menu_id)[0].id;
      }
      if (this.main === "1") {
        mainId = this.menuMain(menu_id)[1].id;
      }
      if (this.dessert === "0") {
        dessertId = this.menuDessert(menu_id)[0].id;
      }
      if (this.dessert === "1") {
        dessertId = this.menuDessert(menu_id)[1].id;
      }

      var dishesIds = [starterId, mainId, dessertId];
      console.log("dishesIds " + dishesIds);

      var objIndex = this.participants.findIndex(
        (participant) => participant.id === participant_id
      );
      this.participants[objIndex].dishesIds = dishesIds;
    },
    getAllMenusData() {
      const menus = this.$store.getters.getAllMenus;
      var menusDate = [];

      for (let i = 0; i < menus.length; i++) {
        let date = menus[i].startDate.slice(0, 10);
        menusDate.push(date);
      }
      return menusDate;
    },
    dateDisabled(ymd, date) {
      const menus = this.getAllMenusData();
      //console.log(menus[0])

      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const checkDate = year + "-" + month + "-" + day;

      // Return `true` if the date should be disabled

      return !menus.includes(checkDate);
    },

    onContext(ctx) {
      this.context = ctx;
    },
    showNextForm() {
      if (this.form1) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;
        this.form4 = false;
        this.form5 = false;
      } else if (this.form2) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;
        this.form4 = false;
        this.form5 = false;
      } else if (this.form3) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form5 = false;
      } else if (this.form4) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = false;
        this.form5 = true;
      }
    },
    showPreviousForm() {
      if (this.form4) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;
        this.form4 = false;
      } else if (this.form3) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;
        this.form4 = false;
      } else if (this.form2) {
        this.form1 = true;
        this.form2 = false;
        this.form3 = false;
        this.form4 = false;
      }
    },
    async checkParticipant() {
      console.log(this.getLoggedUserInformation.email);
      if (this.email != this.getLoggedUserInformation.email) {
        await this.$store.dispatch("getParticipant", this.email);
        const participant = this.$store.getters.getParticipantByEmail;
        console.log(participant);
        if (participant) {
          var findEmail = undefined;

          if (this.participants) {
            findEmail = this.participants.find(
              (participant) => participant.email === this.email
            );
          }

          if (findEmail === undefined) {
            this.participants.push(participant);
            console.log("participante adicionado");
          } else {
            console.log("PARTICIPANTE JÁ ADICIONADO!");
          }
        } else {
          console.log("nao foi encontrado nenhum user com esse email");
        }
      } else {
        console.log("o user já está inserido");
      }
    },

    removeParticipant(id) {
      var index = this.participants.findIndex(function (participant) {
        return participant.id === id;
      });
      if (index != -1) {
        this.participants.splice(index, 1);
      }
    },
    menuMain(id) {
      return this.$store.getters.getMenuMain(id);
    },
    menuStarter(id) {
      return this.$store.getters.getMenuStarter(id);
    },
    menuDessert(id) {
      return this.$store.getters.getMenuDessert(id);
    },
    getDish(id) {
      return this.$store.getters.getDish(id)[0].name;
    },
    Reservation() {
      console.log(this.participants);
      let err = false;

      let arrayParticipant = [];
      for (let i = 0; i < this.participants.length; i++) {
        if (!this.participants[i].dishesIds) {
          console.log("falta pratos");
          err=true;
          break;
        }
        let obj = {
          userId: this.participants[i].id,
          reservationPrice: "8.00",
          discountId: 2,
          dishesIds: this.participants[i].dishesIds,
        };

        arrayParticipant.push(obj);
      }
      if (!this.date || err===true) {
        console.log("falta data");
      }
      else{
        const reservation = {
        startDate: this.date + " " + this.selectedTime,
        endDate: this.date + " " + this.selectedTime,
        reservationPrice: 6.4,
        message: "mensagem",
        isTableCommunal: false,
        participants: arrayParticipant,
      };
      console.log(reservation);
      this.$store.dispatch("createReservation", reservation);

      }

      
    },
  },
  computed: {
    ...mapGetters({
      getLoggedUserInformation: "getLoggedUserInformation",
    }),
    getAllMenus() {
      return this.$store.getters.getAllMenus;
    },
    getUserById(id) {
      return this.$store.getters.getUserById(id);
    },
    getNextMenu() {
      return this.$store.getters.getNextMenu;
    },
    getMenusByDate() {
      const menus = this.$store.getters.getAllMenus;
      var menuByDate = menus.filter(
        (menu) => menu.startDate.slice(0, 10) === this.date
      );
      return menuByDate;
    },
    getAllDishes() {
      return this.$store.getters.getAllDishes;
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>
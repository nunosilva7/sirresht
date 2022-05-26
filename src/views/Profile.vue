<template>
  <div class="profile">
    <div>
      <h1 style="text-align: center">
        Bem Vindo, {{ getLoggedUserInformation.firstName }}
      </h1>
      <br />
      <br />

      <div>
        <div
          id="nextReservationContainer"
          style="margin-left: 10%; margin-right: 10%; width: 510px; float: left"
        >
          <b-row>
            <b-col>
              <h1 id="reservationTitle" style="font-family: Fredoka medium">
                Próxima Reserva
                <button
                  id="reservationBtn"
                  style="
                    border: none;
                    background-color: #ebebeb;
                    margin-left: 10%;
                  "
                >
                  <b-img
                    style="
                      width: 48px;
                      height: 48px;
                      position: absolute;
                      top: 3px;
                    "
                    @click="openReservationModal"
                    src="../assets/icons/add96.png"
                  ></b-img>
                </button>
              </h1>
            </b-col>
          </b-row>

          <b-row v-if="getNextReservation">
            <b-card-group>
              <NextReservationCard
                :key="getNextReservation.id"
                :nextReservation="getNextReservation"
              />
            </b-card-group>
          </b-row>

          <div
            v-else
            class="justify-content-md-center"
            style="margin-left: 10%"
          >
            <h5>Não tem nenhuma reserva próxima</h5>
          </div>
        </div>
        <div
          id="nextMenuContainer"
          style="
            margin-left: 10%;
            margin-right: 1%;
            margin-top: 0.1%;
            width: 510px;
            float: left;
          "
        >
          <b-row>
            <b-col>
              <h1>Menu em Destaque</h1>
            </b-col>
          </b-row>

          <b-row>
            <b-card-group>
              <NextMenuCardProfile
                :key="getNextMenu.id"
                :nextMenu="getNextMenu"
              />
            </b-card-group>
          </b-row>
          <br />
        </div>
      </div>

      <b-modal id="reservationModal" hide-footer centered>
        <b-form @submit.prevent="">
          <div id="form1" v-if="this.form1" style="height: 24rem">
            <b-row>
              <b-col>
                <b-calendar
                  v-model="date"
                  :date-disabled-fn="dateDisabled"
                  @context="onContext"
                  locale="pt-PT"
                  label-help=""
                  block
                  hide-header
                  required
                ></b-calendar>
              </b-col>
            </b-row>
            <br />
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
              <div style="margin-left: 5%">
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
              </div>
            </b-row>
          </div>
          <div
            id="form2"
            v-if="this.form2"
            style="min-height: 200px; height: 24rem"
          >
            <!--
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
-->
            <div
              v-for="participant in this.participants"
              :key="participant.id"
              style="height: 3rem; margin-bottom: 5%"
            >
              <b-row
                style="
                  border-radius: 5px;
                  margin-left: 5%;
                  margin-right: 5%;

                  height: 3rem;
                  box-shadow: -2px 5px 10px #888888;
                "
              >
                <b-col cols="8" style="margin-top: auto; margin-bottom: auto"
                  >{{ participant.firstName + " " + participant.lastName }}
                </b-col>
                <b-col v-if="getLoggedUserInformation.id != participant.id">
                  <b-img
                    style="display: block; margin-left: auto; cursor: pointer"
                    @click="removeParticipant(participant.id)"
                    src="../assets/icons/fechar.png"
                  ></b-img>
                </b-col>
              </b-row>
              <br />
            </div>

            <b-row
              class="justify-content-md-center"
              style="margin: 2%; min-width: max-content"
              no-gutters
            >
              <b-col
                style="
                  min-width: max-content;
                  max-width: max-content;
                  margin-right: 2%;
                "
              >
                <p
                  style="cursor: pointer; color: #fca311"
                  @click="openAddParticipantModal()"
                >
                  Adicionar um novo participante
                </p>
              </b-col>
              <b-col
                style="
                  min-width: max-content;
                  max-width: max-content;
                  margin-right: 2%;
                "
              >
                <b-img
                  style="
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    top: 1px;
                    cursor: pointer;
                  "
                  @click="openAddParticipantModal()"
                  src="../assets/icons/add96.png"
                ></b-img>
              </b-col>
            </b-row>
          </div>
          <div
            id="form3"
            v-if="this.form3"
            style="min-height: 200px; height: 24rem"
          ></div>
          <div
            id="form4"
            v-if="this.form4"
            style="min-height: 400px; height: 24rem"
          >
            <div
              id="participantsMenu"
              v-for="participant in this.participants"
              :key="participant.id"
              style="
                display: block;
                margin: auto;
                width: 90%;
                border: solid thin #C8C4C4;
                margin-bottom: 4%;
                border-radius: 15px;
                box-shadow: -2px 5px 10px #888888;
              "
            >
              <b-row style="margin-left:1%">
                <b-col style="margin-top:1%">
                  <h6>
                    {{ participant.firstName + " " + participant.lastName }}
                  </h6>
                </b-col>
                <b-col style="margin-top:1%">
                  <h6 v-if="participant.menuPrice!=null">Preço: {{participant.menuPrice}}€</h6>
                  <h6 v-else>Preço: 0,00€</h6>
                </b-col>
              </b-row>
              <b-row style="margin-left:5%">
                <b-col>{{ getDish(participant.dishesIds[0]) }}</b-col>
              </b-row>
              <b-row style="margin-left:5%">
                <b-col>{{ getDish(participant.dishesIds[1]) }}</b-col>
              </b-row>
              <b-row style="margin-left:5%">
                <b-col>{{ getDish(participant.dishesIds[2]) }}</b-col>
              </b-row>
              <b-img
                style="
                  width: 24px;
                  height: 24px;
                  cursor: pointer;
                  display: block;
                  margin-left: auto;
                  margin-right: 2%;
                  margin-bottom:2%
                "
                @click="editParticipant(participant.id)"
                src="../assets/icons/expand-arrows48.png"
              ></b-img>
            </div>
          </div>
          <div id="form5" v-if="this.form5" style="">
            <b-form @submit.prevent="">
              <b-card no body>
                <b-tabs card>
                  <b-tab
                    v-for="menu in getMenusByDate"
                    :key="menu.id"
                    :title="
                      'Menu ' +
                      (1 +
                        getMenusByDate.findIndex((element) => {
                          return element.id === menu.id;
                        }))
                    "
                    @click="clearOptions()"
                  >
                    <b-form
                      @submit.prevent="pickDishes(participant_id, menu.id)"
                    >
                      <b-row>
                        <div>
                          <h6>Entrada</h6>
                          <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group id="starter" required>
                              <b-row>
                                <b-form-radio
                                  v-model="starter"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="0"
                                  >{{
                                    menuStarter(menu.id)[0].name
                                  }}</b-form-radio
                                >
                              </b-row>
                              <b-row>
                                <b-form-radio
                                  v-model="starter"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="1"
                                  >{{
                                    menuStarter(menu.id)[1].name
                                  }}</b-form-radio
                                >
                              </b-row>
                            </b-form-radio-group>
                          </b-form-group>

                          <h6>Prato principal</h6>
                          <b-form-group v-slot="{ ariaDescribedby }" required>
                            <b-form-radio-group id="main" required>
                              <b-row>
                                <b-form-radio
                                  v-model="main"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="0"
                                  required
                                >
                                  {{ menuMain(menu.id)[0].name }}</b-form-radio
                                >
                              </b-row>
                              <b-row>
                                <b-form-radio
                                  v-model="main"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="1"
                                  required
                                  >{{ menuMain(menu.id)[1].name }}</b-form-radio
                                >
                              </b-row>
                            </b-form-radio-group>
                          </b-form-group>
                          <h6>Sobremesa</h6>
                          <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group id="dessert">
                              <b-row>
                                <b-form-radio
                                  v-model="dessert"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="0"
                                >
                                  {{
                                    menuDessert(menu.id)[0].name
                                  }}</b-form-radio
                                >
                              </b-row>
                              <b-row>
                                <b-form-radio
                                  v-model="dessert"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="1"
                                  >{{
                                    menuDessert(menu.id)[1].name
                                  }}</b-form-radio
                                >
                              </b-row>
                            </b-form-radio-group>

                            <b-button type="submit">adicionar</b-button>
                          </b-form-group>
                        </div>
                      </b-row>
                    </b-form>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-form>
          </div>

          <div id="form6" v-if="this.form6"></div>

          <b-row>
            <div class="row px-5">
              <label>{{ formError }}</label>
            </div>
          </b-row>
          <b-row class="justify-content-md-center" no-gutters>
            <b-col>
              <b-button
                style="
                  position: absolute;
                  right: 15%;
                  width: 50%;
                  min-width: max-content;
                  background-color: #fc004c;
                  border: none;
                "
                @click="showPreviousForm()"
                v-if="!this.form1"
                >Voltar</b-button
              >
            </b-col>
            <b-col v-if="!this.form6">
              <b-button
                style="
                  position: absolute;
                  left: 15%;
                  width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                "
                @click="showNextForm()"
                v-if="!this.date"
                disabled
                >Seguinte</b-button
              >

              <b-button
                style="
                  position: absolute;
                  left: 15%;
                  width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                "
                @click="showNextForm()"
                v-else-if="!this.form6 && !this.form5"
                >Seguinte</b-button
              >
            </b-col>
            <b-col v-if="this.form6">
              <b-button
                style="
                  position: absolute;
                  left: 15%;
                  width: 50%;
                  min-width: max-content;
                  border: none;
                "
                @click="Reservation()"
                variant="danger"
                >Concluir</b-button
              >
            </b-col>
            <br />
          </b-row>
          <b-row class="justify-content-md-center"> </b-row>

          <br />
        </b-form>
      </b-modal>

      <b-modal
        id="modal-multi-3"
        size="sm"
        title="Third Modal"
        ok-only
        centered
      >
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
      <!-- 
      <b-modal
        id="modal-multi-4"
        size="lg"
        title="Fourth Modal"
        ok-only
        centered
      >
        <b-form @submit.prevent="">
          <b-card no body>
            <b-tabs card>
              <b-tab
                v-for="menu in getMenusByDate"
                :key="menu.id"
                :title="'Menu ' + menu.id"
                @click="clearOptions()"
              >
                <b-form @submit.prevent="pickDishes(participant_id, menu.id)">
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
                                >{{
                                  menuStarter(menu.id)[0].name
                                }}</b-form-radio
                              >
                            </li>
                            <li>
                              <b-form-radio
                                v-model="starter"
                                :aria-describedby="ariaDescribedby"
                                name="some-radios"
                                value="1"
                                >{{
                                  menuStarter(menu.id)[1].name
                                }}</b-form-radio
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
                                >{{
                                  menuDessert(menu.id)[1].name
                                }}</b-form-radio
                              >
                            </li>
                          </b-form-radio-group>
                        </ul>
                        <b-button type="submit">adicionar</b-button>
                      </b-form-group>
                    </div>
                  </b-row>
                </b-form>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-form>
      </b-modal>
      -->

      <!--Open nextReservationModal with all reservation information-->
      <b-modal id="nextReservationModal" @show="getActiveReservation">
        <div>{{ getActiveReservation() }}</div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NextMenuCardProfile from "../components/NextMenuCardProfile.vue";
import NextReservationCard from "../components/NextReservationCard.vue";

// @ is an alias to /src

export default {
  name: "Profile",
  components: {
    NextMenuCardProfile,
    NextReservationCard,
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
      array: [0, 1, 2],
      addedDishes: false,
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
      form6: false,
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
      await this.$store.dispatch("getNextReservation");
      console.log("nextReservation");

      await this.$store.dispatch("getAllMenus");
      await this.$store.dispatch("getAllDishes");
      let participant = this.getLoggedUserInformation;
      participant.dishesIds = [null, null, null];
      this.participants.push(participant);
    },
    openReservationModal() {
      this.$bvModal.show("reservationModal");
    },
    openAddParticipantModal() {
      this.$bvModal.show("modal-multi-3");
    },
    clearOptions() {
      (this.starter = ""), (this.main = ""), (this.dessert = "");
    },
    editParticipant(id) {
      /*
      this.participant_id = id;
      this.$bvModal.hide("reservationModal");
      */
      this.participant_id = id;
      this.form4 = false;
      this.form5 = true;
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
      this.participants[objIndex].menuPrice = this.getMenuById(menu_id)[0].price;
      //this.$bvModal.hide("modal-multi-4");
      //this.$bvModal.show("reservationModal");
      this.form5 = false;
      this.form4 = true;
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
        this.form3 = false;
        this.form4 = true;
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
        this.form6 = true;
      }
    },
    showPreviousForm() {
      if (this.form4) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;
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
      } else if (this.form5) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form5 = false;
        this.form6 = false;
      } else if (this.form6) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form5 = false;
        this.form6 = false;
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
            participant.dishesIds = [null, null, null];

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
      if (!id) {
        return "Sem escolha";
      }
      return this.$store.getters.getDish(id)[0].name;
    },
    Reservation() {
      console.log(this.participants);
      let err = false;

      let arrayParticipant = [];
      for (let i = 0; i < this.participants.length; i++) {
        if (!this.participants[i].dishesIds) {
          console.log("falta pratos");
          err = true;
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
      if (!this.date || err === true) {
        console.log("falta data");
      } else {
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
    getActiveReservation() {
      return this.$store.getters.getActiveReservation;
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
    getMenuById(){
      return this.$store.getters.getMenuById;
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
    getNextReservation() {
      console.log("NEXT RESERVATION");
      return this.$store.getters.getNextReservation;
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>
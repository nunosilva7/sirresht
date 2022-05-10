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
        <b-form @submit.prevent="">
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
            <ul>
              <li>
                {{
                  getLoggedUserInformation.firstName +
                  " " +
                  getLoggedUserInformation.lastName
                }}
              </li>
            </ul>

            <ul v-for="participant in this.participants" :key="participant.id">
              <li>
                {{ participant.firstName + " " + participant.lastName }}
                <button @click="removeParticipant(participant.id)">
                  fechar
                </button>
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
            <div id="userMenu">
              <h6>
                {{
                  getLoggedUserInformation.firstName +
                  " " +
                  getLoggedUserInformation.lastName
                }}
              </h6>
              <p></p>
              <p></p>
              <p></p>
              <button v-b-modal.modal-multi-4>expandir</button>
            </div>
            <div
              id="participantsMenu"
              v-for="participant in this.participants"
              :key="participant.id"
            >
              <p></p>
              <p></p>
              <p></p>
              <button v-b-modal.modal-multi-4>expandir</button>
            </div>
          </div>

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
              <b-button @click="showNextForm()" v-if="!this.form4"
                >next</b-button
              >
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center"> </b-row>

          <b-row class="justify-content-md-center">
            <b-button type="submit" variant="danger" v-if="this.form4"
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
      <b-modal id="modal-multi-4" size="md" title="Fourth Modal" ok-only>
        <b-form @submit.prevent="">
          <div v-for="menu in getMenusByDate" :key="menu.id">
            <b-row>
              <div>
                <h5>Menu #{{menu.id}}</h5>
                <ul>
                  <li>
                    {{ menuMain(menu.id)[0].name }}
                  </li>
                  <li>
                    {{ menuMain(menu.id)[1].name }}
                  </li>
                </ul>
              </div>
            </b-row>
          </div>
          <b-col>
            <b-button>check</b-button>
          </b-col>
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
      } else if (this.form2) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;
        this.form4 = false;
      } else if (this.form3) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
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
  },
  computed: {
    ...mapGetters({
      getLoggedUserInformation: "getLoggedUserInformation",
    }),
    getAllMenus() {
      return this.$store.getters.getAllMenus;
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
  },
};
</script>

<style src="../assets/customStyle.css">
</style>
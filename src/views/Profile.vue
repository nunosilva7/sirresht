<template>
  <div class="profile">
    <div>
      <h1>PROFILE</h1>

      <b-button v-b-modal.reservationModal>adicionar</b-button>

      <b-modal id="reservationModal" hide-footer>
        <b-form @submit.prevent="">
          <div id="form1" v-if="this.form1">
            <b-row>
              <b-col md="auto">
                <b-calendar
                  v-model="date"
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

            <ul v-for="participant in this.participants" :key="participant.id">
              <li>
                {{ participant.firstName }}
                <button @click="removeParticipant(participant.id)">fechar</button>
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
          </div>

          <b-row>
            <div class="row px-5">
              <label>{{ formError }}</label>
            </div>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-button @click="showPreviousForm()">back</b-button>
          </b-row>
          <b-row class="justify-content-md-center">
            <b-button @click="showNextForm()" v-if="!this.form4">next</b-button>
          </b-row>

          <b-row class="justify-content-md-center">
            <b-button type="submit" variant="danger" v-if="this.form4"
              >Concluir</b-button
            >
          </b-row>
          <br />
        </b-form>
      </b-modal>

      <b-modal id="modal-multi-3" size="sm" title="Third Modal" ok-only>
        <b-form @submit.prevent="">
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Profile",

  data() {
    return {
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

  methods: {
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
    },
    removeParticipant(id) {
      var index = this.participants.findIndex(function (participant) {
        return participant.id === id;
      });
      if(index != -1){
        this.participants.splice(index,1)
      }
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>
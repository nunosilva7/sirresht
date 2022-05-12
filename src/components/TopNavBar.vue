<template>
  <div>
    <b-navbar id="nav" toggleable type="light">
      <img
        href="#"
        id="logo"
        src="../assets/placeholder-image.png"
        class="img-fluid"
        height="100px"
        width="100px"
        alt="logotipo da página"
      />

      <b-navbar-toggle id="coiso" target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
          :to="{name:'Home'}"
          :class="{active:$route.name==='Home'}"
          >Home</b-nav-item>
          <b-nav-item 
           :to="{name:'Profile'}"
          :class="{active:$route.name==='Profile'}"
          >Perfil</b-nav-item>
          <b-nav-item 
           :to="{name:'Reservations'}"
          :class="{active:$route.name==='Reservations'}"
          >Reservas</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <template v-if="isLoggedUser === false">
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" v-b-modal.registerModal>Registo</b-nav-item>
          <b-nav-item href="#" v-b-modal.loginModal>Entrar</b-nav-item>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" @click="logout()">Sair</b-nav-item>
        </b-navbar-nav>
      </template>
    </b-navbar>

    <b-modal id="registerModal" hide-footer>
      <b-form @submit.prevent="register()">
        <b-row>
          <b-col cols="6">
            <b-form-input
              v-model="registerData.firstName"
              type="text"
              placeholder="Nome"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
          <b-col cols="6">
            <b-form-input
              v-model="registerData.lastName"
              type="text"
              placeholder="Apelido"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="É docente/aluno do IPP?"
              v-slot="{ ariaDescribedby }"
            >
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
          <b-col cols="12">
            <b-form-input
              v-model="registerData.email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-input
              v-model="registerData.password"
              type="password"
              placeholder="Password"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-input
              v-model="registerData.passwordVerify"
              type="password"
              placeholder="Repita password"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
        </b-row>

        <br />

        <b-row class="justify-content-md-center">
          <b-button type="submit" variant="danger">Registar</b-button>
        </b-row>
      </b-form>
    </b-modal>

    <b-modal id="loginModal" hide-footer>
      <b-form @submit.prevent="login()">
        <b-row>
          <b-col cols="12">
            <b-form-input
              v-model="loginData.email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-form-input
              v-model="loginData.password"
              type="password"
              placeholder="Password"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
        </b-row>
        <b-row>
          <div class="row px-5">
            <label>{{ formError }}</label>
          </div>
        </b-row>

        <b-row class="justify-content-md-center">
          <b-button type="submit" variant="danger">Entrar</b-button>
        </b-row>
        <br />
        <b-row class="justify-content-md-center">
          <p href="">Não tem conta? Registe aqui.</p>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TopNavBar",

  watch: {
    isLoggedUser: function (newVal, oldVal) {
      console.log("Prop mudou isLoggedUser: ", newVal, " | era: ", oldVal);
    },
  },
  data() {
    return {
      selected: "",
      options: [
        { text: "Sim", value: "1" },
        { text: "Não", value: null },
      ],

      loginData: {
        email: "",
        password: "",
      },
      registerData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordVerify: "",
      },
      formError: "",
      errorMsg: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log("coiso");
        this.formError = "";

        const credentials = {
          email: this.loginData.email,
          password: this.loginData.password,
        };
        const loginData = {
          credentials: credentials,
        };
        console.log(loginData.credentials);

        await this.$store.dispatch("login", loginData);
        this.$bvModal.hide("loginModal");

        /* Se o login falhar por alguma razão um trow vai ser lançado e o redirect
           da route para o home não vai ser executado */
        this.$router.push({ name: "Profile" });
      } catch (error) {
        console.log(error);
        this.formError = error;
      }
    },
    logout() {
      this.$store.dispatch("logout", this.$data);

      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },

    async register(){
      try {
        this.$data.formError ="";

      if(this.$data.registerData.password !=this.$data.registerData.passwordVerify){
        throw "As passwords tem que ser iguais.";
      }

      const user ={
        firstName:this.registerData.firstName,
        lastName: this.registerData.lastName,
        email: this.registerData.email,
        password :this.registerData.password
      }
      await this.$store.dispatch("register", user);
      this.$bvModal.hide("registerModal");
      this.$bvModal.show("loginModal");
        
      } catch (error) {
          this.$data.formErros = error;
      }
      
    }
    
  },
  computed: {
    ...mapGetters({
      isLoggedUser: "isLoggedUser",
    }),
  },
};
</script>


<style src="../assets/topNavBar.css"></style>

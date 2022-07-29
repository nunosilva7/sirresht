<template>
  <div>
    <b-navbar id="nav" toggleable type="light">
      <div id="logo" class="ml-auto">
        <img
          href="#"
          id="logo"
          src="../assets/placeholder-image.png"
          class="img-fluid"
          height="100px"
          width="100px"
          alt="logotipo da página"
        />
      </div>

      <b-navbar-toggle
        id="hamburguer"
        target="navbar-toggle-collapse"
        style="color: black"
      >
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="list"></b-icon>
          <b-icon
            id="menuIcon"
            v-else
            icon="list"
            style="color: orange; outline: none"
          ></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :to="{ name: 'Home' }"
            :class="{ active: $route.name === 'Home' }"
            >Página Inicial</b-nav-item
          >
          <b-nav-item
            :to="{ name: 'Menus' }"
            :class="{ active: $route.name === 'Menus' }"
            >Menus</b-nav-item
          >
          <template v-if="isLoggedUser">
            <b-nav-item
              v-if="!isLoggedAdmin()"
              :to="{ name: 'Profile' }"
              :class="{ active: $route.name === 'Profile' }"
              >Perfil</b-nav-item
            >
            <b-nav-item
              v-else
              :to="{ name: 'Admin' }"
              :class="{ active: $route.name === 'Admin' }"
              >Admin</b-nav-item
            >
          </template>

          <b-nav-item
            :to="{ name: 'Reservations' }"
            :class="{ active: $route.name === 'Reservations' }"
            >Reservas</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
      <template v-if="isLoggedUser === false">
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" v-b-modal.registerModal
            ><p id="registerTxt" style="margin: 0">Registo</p></b-nav-item
          >
          <b-nav-item href="#" v-b-modal.loginModal
            ><p id="loginTxt" style="margin: 0">Entrar</p></b-nav-item
          >
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav class="ml-auto">
          <b-row @click="perfilEdit = !perfilEdit" style="cursor: pointer">
            <b-col style="padding-right: 10px">
              <b-avatar
                v-if="this.avatar != null"
                :src="this.avatar"
              ></b-avatar>
              <b-avatar v-else></b-avatar>
            </b-col>
          </b-row>
        </b-navbar-nav>
      </template>
    </b-navbar>
    <div
      v-if="perfilEdit"
      style="
        cursor: pointer;
        width: max-content;
        position: absolute;
        right: 0;
        z-index: 1;
        background-color: white;
        border: 2px solid grey;
        border-radius: 5px;
      "
    >
      <p style="padding-left: 5px" v-b-modal.editPassword>Alterar password</p>
      <hr />
      <p style="padding-left: 5px; padding-right: 5px" v-b-modal.editAvatar>
        Alterar imagem de perfil
      </p>
      <hr />
      <p class="text-center" @click="logout()" style="padding-left: 5px">
        Sair
      </p>
    </div>

    <b-modal
      id="registerModal"
      hide-footer
      centered
      headerClass="p-2 border-bottom-0"
    >
      <b-form @submit.prevent="register()" style="font-family: Fredoka regular">
        <b-row>
          <b-col cols="6">
            <b-form-input
              id="registerFirstName"
              v-model="registerData.firstName"
              type="text"
              placeholder="Nome"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />

          <b-col cols="6">
            <b-form-input
              id="registerLastName"
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
              id="registerSelect"
              label="É docente/aluno do IPP? (20% desconto)"
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
              id="registerEmail"
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
              id="registerPassword"
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
              id="registerPasswordV"
              v-model="registerData.passwordVerify"
              type="password"
              placeholder="Repita password"
              required
            ></b-form-input>
          </b-col>
        
        </b-row>
         <b-alert style="margin-top:2%" v-model="registerAlert" >
            {{ registerAlertText }}
          </b-alert>

      
          <b-alert style="margin-top:2%" v-model="register2Alert" variant="danger">
            {{ register2AlertText }}
          </b-alert>

        <b-row class="justify-content-md-center">
          <b-button
            style="margin: auto"
            id="registerBtn"
            type="submit"
            variant="danger"
            >Registar</b-button
          >
        </b-row>
        <br />

        <div
          class="justify-content-md-center"
          style="display: flex; justify-content: center"
        >
          <span style="font-family: Fredoka light">Já tem conta?</span
          ><span style="font-family: Fredoka light; color: #fca311"
            >&nbsp;Clique aqui</span
          >
        </div>
      </b-form>
    </b-modal>

    <b-modal
      id="loginModal"
      hide-footer
      centered
      headerClass="p-2 border-bottom-0"
    >
      <b-form @submit.prevent="login()" style="font-family: Fredoka regular">
        <b-row>
          <b-col cols="12">
            <b-form-input
              id="loginEmail"
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
              id="loginPassword"
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
        <b-alert v-model="loginAlert" dismissible>
            {{ loginAlertText }}
          </b-alert>

        <b-row class="justify-content-md-center">
          <b-button
            id="loginBtn"
            type="submit"
            style="margin: auto; font-family: Fredoka medium"
            >Entrar</b-button
          >
        </b-row>
        <br />
        <b-row class="justify-content-md-center">
          <p
            id="registerPText"
            href=""
            style="
              margin-right: 0px;
              margin-left: 22%;
              font-family: Fredoka light;
            "
          >
            Não tem conta?
          </p>
          <span
            id="registerBtn-loginModal"
            style="margin-right: 20%; margin-left: 1%"
            @click="openRegisterModal"
            >Registe aqui.</span
          >
        </b-row>
      </b-form>
    </b-modal>

    <b-modal id="editPassword" centered hide-footer>
      <b-form @submit.prevent="updatePassword()">
        <b-row>
          <b-col cols="12">
            <b-form-input
              id="registerPassword"
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
              id="registerPasswordV"
              v-model="registerData.passwordVerify"
              type="password"
              placeholder="Repita password"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
         
        </b-row>
         <b-alert v-model="updatePasswordAlert" dismissible>
            {{ updatePasswordAlertText }}
          </b-alert>
        <b-row>
          <b-button
            style="
              margin: auto;
              display: block;
              width: 60%;
              margin-top: 10%;
              background-color: #fca311;
              border: none;
              font-family: Fredoka medium;
            "
            type="submit"
            :disabled="
              registerData.password == '' || registerData.passwordVerify == ''
            "
            >Atualizar password</b-button
          >
        </b-row>
      </b-form>
    </b-modal>

    <b-modal id="editAvatar" centered hide-footer>
      <b-form @submit.prevent="updateAvatar()">
        <div>
          <input type="file" @change="previewImage" accept="image/*" />
        </div>
        <div>
          <p>
            Progresso: {{ uploadValue.toFixed() + "%" }}
            <progress id="progress" :value="uploadValue" max="100"></progress>
          </p>
        </div>
        <div v-if="imageData != null">
          <img
            style="margin: auto; display: block"
            class="preview"
            width="200px"
            height="150px"
            :src="picture"
          />
          <br />
          <b-button
            v-if="picture == null || imageData == null"
            style="
              margin: auto;
              display: block;
              width: 60%;
              margin-top: 2%;
              background-color: #fca311;
              border: none;
              font-family: Fredoka medium;
            "
            @click="onUpload"
            >Carregar imagem</b-button
          >
        </div>

         <b-alert v-model="updateAvatarAlert" dismissible>
            {{ updateAvatarAlertText }}
          </b-alert>

        <b-button
          style="
            margin: auto;
            display: block;
            width: 60%;
            margin-top: 10%;
            background-color: #fca311;
            border: none;
            font-family: Fredoka medium;
          "
          type="submit"
          :disabled="picture == null || imageData == null"
          >Atualizar</b-button
        >

       
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
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
        { text: "Sim", value: 2 },
        { text: "Não", value: 3 },
      ],
      avatar:"",

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
      perfilEdit: false,

      imageData: null,
      picture: null,
      uploadValue: 0,
      updatePasswordAlert: false,
      updatePasswordAlertText: "",
      updateAvatarAlert: false,
      updateAvatarAlertText: "",

      loginAlert: false,
      loginAlertText: "",

      registerAlert: true,
      registerAlertText: "A password deve ter no minimo 8 caracteres, 1 Maiúscula, 1 Minúscula, 1 número, 1 simbolo",

       register2Alert: false,
      register2AlertText: "",
      
    };
  },
  created: function () {
    this.getLoggedUser()
    
  },
  
  updated: function () {
    this.getLoggedUser()
   

    
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
      } catch (error) {
        console.log(error);
        this.formError = error;
      }
    },
    logout() {
      this.$store.dispatch("logout", this.$data);
      this.perfilEdit = false;

      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },

    async register() {
      try {
        this.$data.formError = "";

        if (
          this.$data.registerData.password !=
          this.$data.registerData.passwordVerify
        ) {

          this.register2Alert = true;
          this.register2AlertText ="As passwords não são iguais!"
          throw "As passwords tem que ser iguais.";

        }

        const user = {
          firstName: this.registerData.firstName,
          lastName: this.registerData.lastName,
          email: this.registerData.email,
          password: this.registerData.password,
          discountId: this.selected,
        };
        await this.$store.dispatch("register", user);
        this.$bvModal.hide("registerModal");
        this.$bvModal.show("loginModal");
      } catch (error) {
       
       this.register2Alert = true;
          this.register2AlertText ="A password não cumpre requisitos"
      }
    },
   async getLoggedUser() {
      //console.log(this.$store.getters.getLoggedUserInformation);
      let user = this.$store.getters.getLoggedUserInformation
      if (user) {
        await this.$store.dispatch("getUserById", user.id)
        //return this.$store.getters.getLoggedUserInformation.avatarReference;
        let updatedUser = this.$store.getters.getUserById
        this.avatar = updatedUser.avatarReference
      }
    },

    
    async updatePassword() {
      if(this.registerData.password != this.registerData.passwordVerify){
        this.updatePasswordAlert = true;
        this.updatePasswordAlertText ="As passwords não são iguais!"
       
      }
      if(this.registerData.password == this.registerData.passwordVerify){
        let user = this.$store.getters.getLoggedUserInformation;
        let userEmail = user.email
         
          const userCredentials ={
            email: userEmail,
            password: this.registerData.password
          }
          console.log(userCredentials)

          //await this.$store.dispatch("changePassword", userCredentials)
         
          try {
            await this.$store.dispatch("changePassword",userCredentials)
            this.updatePasswordAlert = true;
            this.updatePasswordAlertText ="Password alterada com sucesso!"
          } catch (error) {
            this.updatePasswordAlert = true;
            this.updatePasswordAlertText = "A password deve ter no minimo 8 caracteres, 1 Maiúscula, 1 Minúscula, 1 número, 1 simbolo"
          }
          

      }
    },

    async updateAvatar(){
      const avatar = {
        avatarReference:this.picture
      }
      console.log(JSON.stringify(avatar))
      
       this.getLoggedUser()
       try {
            await this.$store.dispatch("updateAvatar", avatar)
            this.updateAvatarAlert = true;
            this.updateAvatarAlertText ="Avatar alterado com sucesso!"
             this.getLoggedUser()
          } catch (error) {
            this.updateAvatarAlert = true;
            this.updateAvatarAlertText = "Não foi possível fazer a alteração."
            console.log(error)
             this.getLoggedUser()
           
          }
          
    },

    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },

    openRegisterModal() {
      this.$bvModal.hide("loginModal");
      this.$bvModal.show("registerModal");
    },
    
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    },
  },
  computed: {
    ...mapGetters({
      isLoggedUser: "isLoggedUser",
    }),
    
  },
};
</script>


<style src="../assets/topNavBar.css"></style>

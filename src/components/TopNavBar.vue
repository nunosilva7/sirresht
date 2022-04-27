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
          <b-nav-item href="#">Link 1</b-nav-item>
          <b-nav-item href="#">Link 2</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <template>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" v-b-modal.registerModal>Registo</b-nav-item>
          <b-nav-item href="#" v-b-modal.loginModal>Entrar</b-nav-item>
        </b-navbar-nav>
      </template>
    </b-navbar>

    <b-modal id="registerModal" hide-footer>
      <b-form @submit.prevent="">
        <b-row>
          <b-col cols="6">
            <b-form-input
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
      <b-form @submit.prevent="">
        
          
        <b-row>
          <b-col cols="12">
            <b-form-input
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
              type="password"
              placeholder="Password"
              required
            ></b-form-input>
          </b-col>
          <br />
          <br />
          <br />
          
          
        </b-row>

        

        <b-row class="justify-content-md-center">
          <b-button type="submit" variant="danger">Entrar</b-button>
          
        </b-row>
        <br>
        <b-row class="justify-content-md-center">
            <p href="" >Não tem conta? Registe aqui.</p>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "",
      options: [
        { text: "Sim", value: "1" },
        { text: "Não", value: null },
      ],
    };
  },
};
</script>


<style src="../assets/topNavBar.css"></style>

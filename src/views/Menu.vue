<template>
  <div id="menus" style="margin: auto">
    <br>
    <b-tabs content-class="mt-3" v-if="isLoggedAdmin()" active-nav-item-class="font-weight-bold text-success" >
      <!-- This tabs content will always be mounted -->
      <b-tab title="Menus"
        ><b-container style="margin-left: 2%">
          
        <b-row>
        <b-col cols="7" style="margin-top: 1%">
          <b-button variant="warning" v-b-modal.createBolsaModal
            >Criar Menu</b-button
          >
        </b-col>
        </b-row>
        <br>
          <br>

          <b-row>
            <b-col>
              <label for="select3">Data</label>
            </b-col>
            <b-col>
              <label for="select4">Horário</label>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-datepicker
                id="example-datepicker"
                placeholder="YYYY-MM-DD"
                class="mb-2"
              ></b-form-datepicker>
            </b-col>
            <b-col>
                <b-form-select id="select4" >
          <b-form-select-option value: null>Almoço</b-form-select-option>
          <b-form-select-option value="jantar">Jantar</b-form-select-option>
        </b-form-select>

            </b-col>
          </b-row>
        </b-container>

        <hr class="rounded" />
        <b-container fluid>
          <h1 v-if="!getAllMenus.length">Não Foram Encontrados menus!</h1>
          <b-row style="margin-right: 0%; margin-left: 10%" id="menuCardRow">
            <MenusCard
              v-for="myMenu in getAllMenus"
              :key="myMenu.id"
              :menu="myMenu"
            />
          </b-row> </b-container
      ></b-tab>

      <!-- This tabs content will not be mounted until the tab is shown -->
      <!-- and will be un-mounted when hidden -->
      <b-tab title="Pratos" lazy 
        ><b-alert show>Pratos</b-alert>
        <b-row>
        <b-col cols="7" style="margin-top: 1%">
          <b-container style="margin-left: 2%">
            <b-button variant="warning" v-b-modal.createDish
            >Criar Pratos</b-button
          >
          </b-container>
          
        </b-col>
        </b-row>
        </b-tab
      >
    </b-tabs>
    <br />
    <br />
    <div v-if="!isLoggedAdmin()">
    <b-container style="margin-left: 2%">
      <b-row>
        <b-col>
          <label for="select3">Data</label>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-datepicker
            id="example-datepicker"
            placeholder="YYYY-MM-DD"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
      </b-row>
    </b-container>

    <hr class="rounded" />
    <b-container fluid >
      <h1 v-if="!getAllMenus.length">Não Foram Encontrados menus!</h1>
      <b-row style="margin-right: 0%; margin-left: 10%" id="menuCardRow">
        <MenusCard
          v-for="myMenu in getAllMenus"
          :key="myMenu.id"
          :menu="myMenu"
        />
      </b-row>
    </b-container>
    </div>
    <b-modal id="createDish" centered>
         <div>
      <img :src="this.previewImage" class="uploading-image " width="200px" height="150px" style="margin:auto" />
      <br>
      <input type="file" accept="image/jpeg" @change=uploadImage  >
   </div>
   <br>
   <b-row>
    <b-col>
      <label for="dishType">Tipo de prato</label>
    </b-col>
      <b-col>
      <label for="option">Opcção</label>
    </b-col>
   </b-row>
   <b-row>
    <b-col>
         <b-form-select id="dishType" >
          <b-form-select-option value: null>Prato Principal</b-form-select-option>
          <b-form-select-option value="starter">Entrada</b-form-select-option>
           <b-form-select-option value="dessert">Sobremesa</b-form-select-option>
        </b-form-select>
    </b-col>
    <b-col>
      <b-form-select id="option" >
          <b-form-select-option value: null>Carne</b-form-select-option>
          <b-form-select-option value="fish">Peixe</b-form-select-option>
           <b-form-select-option value="vegetarian">Vegetariano</b-form-select-option>
        </b-form-select>
      
    </b-col>
   </b-row>
   <br>
   <b-form-input v-model="dishName" placeholder="Nome do prato"></b-form-input>
      </b-modal>
  </div>
</template>

<script>
import MenusCard from "../components/MenusCard.vue";

export default {
  name: "Menus",
  components: {
    MenusCard,
  },
  data() {
    return {
      ordem: null,
      estado: null,
      users: [],
      previewImage: null,
      dishName:""
    };
  },
  created: function () {
    this.prepareData();
  },

  methods: {
    async prepareData() {
      await this.$store.dispatch("getAllMenus");
      await this.$store.dispatch("getAllDishes");
    },
    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    
   
  },
  computed: {
    getAllMenus() {
      console.log(this.$store.getters.getAllMenus);
      return this.$store.getters.getAllMenus;
    },
  },
};
</script>

<style>
.uploading-image {
  display: flex;
}
</style>
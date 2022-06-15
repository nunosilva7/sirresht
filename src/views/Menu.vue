<template>
  <div id="menus" style="margin: auto">
    <br>
    <b-tabs content-class="mt-3" v-if="isLoggedAdmin()" active-nav-item-class="font-weight-bold text-success" >
      <!-- This tabs content will always be mounted -->
      <b-tab title="Menus"
        ><b-container style="margin-left: 2%">
          
        <b-row>
        <b-col cols="7" style="margin-top: 1%">
          <b-button variant="warning" v-b-modal.createMenu
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

    <!--CREATE DISH MODAL-->
    <b-modal id="createDish" centered hide-footer>
      <b-form @submit.prevent="createDish()">
      <div v-if="this.previewImage!=null ">
     
      <img  :src="this.previewImage" alt="Imagem do prato" @error="previewImageNull()"  class="uploading-image " width="200px" height="150px" style="margin:auto;border:1px solid" required />
      <br>
    
   </div>
   <div v-else>
     
      <img  src="../assets/img/placeholderimage.png" alt="Imagem do prato"   width="200px" height="150px" style="margin:auto;display:block;border:1px solid" required />
      <br>
    
   </div>
     <b-form-input type="url" v-model="previewImage" placeholder="Insira o url da imagem" required ></b-form-input>
   <br>
   <b-row>
    <b-col>
      <label for="dishType" >Tipo de prato</label>
    </b-col>
      <b-col>
      <label for="option">Opcção</label>
    </b-col>
   </b-row>
   <b-row>
    <b-col>
         <b-form-select id="dishType" v-model="dishType" :options="options" required >
         
        </b-form-select>
    </b-col>
    <b-col>
      <b-form-select id="option" >
          <b-form-select-option value="coiso">Carne</b-form-select-option>
          <b-form-select-option value="fish">Peixe</b-form-select-option>
           <b-form-select-option value="vegetarian">Vegetariano</b-form-select-option>
        </b-form-select>
      
    </b-col>
   </b-row>
   <br>
   <label for="dishName" >Nome do Prato</label>
   <b-form-input id="dishName" type="text" v-model="dishName" required placeholder="Nome do prato"></b-form-input>

   <b-button style="margin:auto;display:block;width:60%;margin-top:10%" type="Submit" >adicionar</b-button>
   </b-form>
  </b-modal>

  <!-- CREATE MENU MODAL -->
  <b-modal id="createMenu" centered hide-footer>
    <form @submit.prevent="">
      <b-row>
              <b-col>
                <b-calendar
                  v-model="formMenu.date"
                  @context="onContext"
                  locale="pt-PT"
                  label-help=""
                  block
                  hide-header
                  required
                ></b-calendar>
              </b-col>
       </b-row>
       <br>
       <b-row>
        <b-col md="8">
        <b-form-timepicker  labelNoTimeSelected= 'Nenhuma hora selecionada'
            labelCloseButton= 'Fechar' locale="pt-PT"></b-form-timepicker>
        </b-col>
       </b-row>
       <br>
       
       <b-row>
        <b-col>
          Preço
        </b-col>
        <b-col>
          Nº de Reservas
        </b-col>
       </b-row>
       <b-row>
        <b-col>
          <b-input placeholder="Preço da reserva"></b-input>
        </b-col>
       <b-col>
        <b-input placeholder="Nº de reservas"></b-input>
       </b-col>
       </b-row>

       <b-button style="margin:auto;display:block;width:60%;margin-top:10%" type="Submit">Adicionar</b-button>
      
    </form>

  </b-modal>
  </div>
</template>

<script>
import MenusCard from "../components/MenusCard.vue";
//import { getStorage, ref } from "firebase/storage";
//import * as firebase  from "firebase";

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
      isImageValid: null,
      img1: null,
      options: [
        { value: 1, text: "Prato Principal" },
        { value: 2, text: "Entrada" },
        { value: 3, text: "Sobremesa" },
      ],
      dishName: "",
      dishType: "1",
      formMenu: {
        date: "",
      },
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
    onContext(ctx) {
      this.context = ctx;
    },
    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },
    previewImageNull() {
      this.previewImage = null;
    },
    checkImage(url) {
      var image = new Image();
      image.onload = function () {
        if (this.width > 0) {
          console.log("image exists");
          this.previewImage = url;
          return true;
        }
      };
      image.onerror = function () {
        console.log("image doesn't exist");
        return false;
      };
      image.src = url;
    },

    /*
    uploadImage(e) {
      

      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };

      const storage = getStorage();
      const img = ref(storage, this.previewImage)
      console.log(img)
      const post={
        img: this.previewImage,
        caption: "this.dishName"
      }

       firebase.database().ref('PhotoGallery').push(post)
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
      
      
        
      
    },*/

    createDish() {
      if (this.checkImage(this.previewImage)) {
        let dish = {
          name: this.dishName,
          courseId: this.dishType,
          isALaCarte: false,
          imgReference: this.previewImage,
        };
        console.log(dish);
      } else {
        console.log("imagem não é válida");
      }
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
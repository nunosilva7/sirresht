<template>
  <div id="menus" style="margin: auto">
    <br>
    <b-tabs content-class="mt-3" v-if="isLoggedAdmin()" active-nav-item-class="font-weight-bold text-success" style="font-family:Fredoka Regular" >
      <!-- This tabs content will always be mounted -->
      <b-tab title="Menus"
        ><b-container style="margin-left: 2%">
          
        <b-row style="font-family:Fredoka regular">
        <b-col cols="7" style="margin-top: 1%">
          <b-button variant="warning" v-b-modal.createMenu
            >Criar Menu</b-button
          >
        </b-col>
        </b-row>
        <br>
          <br>

          <b-row style="font-family:Fredoka medium">
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
                style="font-family:Fredoka regular"
                id="example-datepicker"
                placeholder="YYYY-MM-DD"
                
                class="mb-2"
                hide-header
                no-flip
                weekday-header-format="narrow"
              ></b-form-datepicker>
            </b-col>
            <b-col>
                <b-form-select id="select4" >
          <b-form-select-option value: null>almoço</b-form-select-option>
          <b-form-select-option value="jantar">jantar</b-form-select-option>
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
          </b-row></b-container
      ></b-tab>

      <!-- This tabs content will not be mounted until the tab is shown -->
      <!-- and will be un-mounted when hidden -->
      <b-tab title="Pratos" lazy >
        <b-row style="font-family:Fredoka regular">
        <b-col cols="7" style="margin-top: 1%">
          <b-container style="margin-left: 2%">
            <b-button variant="warning" v-b-modal.createDish
            >Criar Pratos</b-button
          >
          </b-container>
          
        </b-col>
        </b-row>
        <hr class="rounded" />
        <b-container fluid>
          <h1 v-if="!getAllDishes.length">Não Foram Encontrados pratos!</h1>
          <b-row style="margin-right: 0%; margin-left: 10%" id="menuDishRow">
            <DishesCard
              v-for="myDish in getAllDishes"
              :key="myDish.id"
              :dish="myDish"
            />
          </b-row> 
          </b-container>
        </b-tab>
    </b-tabs>
    <br />
    <br />
    <div v-if="!isLoggedAdmin()">
    <b-container style="margin-left: 2%">
      <b-row>
        <b-col>
          <label for="select3" style="font-family:Fredoka Medium">Data</label>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-datepicker
          style="font-family:Fredoka Regular"
            id="example-datepicker"
            placeholder="YYYY-MM-DD"
            class="mb-2"
            v-model="menuDate"
            hide-header
            no-flip
            weekday-header-format="narrow"
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
    <div v-if="!getAllMenus.length" style="height:200px">

    </div>
    </div>

    <!--CREATE DISH MODAL-->
    <b-modal id="createDish" centered hide-footer>
      <b-form @submit.prevent="createDish()">
      
     <div>
      <input type="file" @change="previewImages" accept="image/*" >                
    </div>
    <div>
      <p>Progresso: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <div v-if="imageData!=null">                     
        <img style="margin:auto;display:block" class="preview" width="200px" height="150px" :src="picture">
        <br>
         <b-button 
         style="margin:auto;display:block;width:60%;margin-top:2%;background-color:#fca311;border:none;font-family:Fredoka medium"
         type="button" @click="onUpload">Carregar imagem</b-button>
    </div> 
   <br>
   <b-row style="font-family:Fredoka regular">
    <b-col>
      <label for="dishType" >Tipo de prato</label>
    </b-col>
      <b-col>
      <label for="option">Opcção</label>
    </b-col>
   </b-row>
   <b-row style="font-family:Fredoka light">
    <b-col >
         <b-form-select id="dishType" v-model="dishType" :options="options" required >
         
        </b-form-select>
    </b-col>
    <b-col >
      <b-form-select id="option"  >
          <b-form-select-option value="coiso">Carne</b-form-select-option>
          <b-form-select-option value="fish">Peixe</b-form-select-option>
           <b-form-select-option value="vegetarian">Vegetariano</b-form-select-option>
        </b-form-select>
      
    </b-col>
   </b-row>
   <br>
   <label style="font-family:Fredoka regular" for="dishName" >Nome do Prato</label>
   <b-form-input  style="font-family:Fredoka light" id="dishName" type="text" v-model="dishName" required placeholder="Nome do prato"></b-form-input>

   <b-button style="margin:auto;display:block;width:60%;margin-top:10%;background-color:#fca311;border:none;font-family:Fredoka medium" type="Submit" 
    :disabled="picture==null"
    >Criar prato</b-button>
   </b-form>
  </b-modal>

  <!-- CREATE MENU MODAL -->
  <b-modal id="createMenu" centered hide-footer :title="getMenuModalTitle()">
    <form @submit.prevent="createMenu()">
      <div v-if="this.form1" id="form1">
        <b-row>
              <b-col>
                <b-calendar
                style="font-family: Fredoka regular"
                  v-model="form.date"
                  @context="onContext"
                  locale="pt-PT"
                  label-help=""
                  :min="minDate"
                  :max="maxDate"
                  block
                  hide-header
                  required
                ></b-calendar>
              </b-col>
       </b-row>
       <br>
      <b-row>
              <b-col cols="12">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    id="radio-slots"
                    v-model="form.selected"
                    :options="options2"
                    :aria-describedby="ariaDescribedby"
                    name="radio-options-slots"
                    style="font-family: Fredoka regular"
                  >
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            
      
       
       <b-row style="font-family: Fredoka Medium">
        <b-col>
          Preço 
        </b-col>
        <b-col>
          Nº de Reservas
        </b-col>
       </b-row>
       <b-row style="font-family: Fredoka light ">
        <b-col>
         
          <b-form-input  v-model="form.menuPrice" type="number" step="0.05" min="0.00" max="150.00" placeholder="Preço da reserva(€)" required></b-form-input>
        </b-col>
       <b-col>
        <b-form-input v-model="form.menuMaxReservations"  type="number"  min="0" max="80" placeholder="Nº de reservas" required></b-form-input>
      
       </b-col>
       </b-row>

       <b-row>
        <b-button :disabled="isForm1Done()" @click="nextForm()" style="margin:auto;display:block;width:60%;margin-top:10%;min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;">Seguinte</b-button>
       </b-row>

      </div>
      <div id="form2" v-if="this.form2">
        <b-row style="font-family: Fredoka regular">
          <b-col cols="10">Entradas</b-col>
          <b-col cols="2">Qtd.</b-col>
        </b-row>
        <b-row no-gutters style="font-family: Fredoka light">
          <b-col cols="10">
            <v-select v-model="form.dishStarter1" :options="getStarterDishForSelect" style="font-size:80%;" required></v-select>
          </b-col>
          <b-col cols="2">
            <b-input v-model="form.starter1Qt" style="font-size:80%"  type="number" min="1" :max="this.form.menuMaxReservations" required></b-input>
          </b-col>
        </b-row>
        <b-row no-gutters style="margin-top:3%;font-family: Fredoka light" >
          <b-col cols="10">
            <v-select v-model="form.dishStarter2" :options="getStarterDishForSelect" style="font-size:80%;" required></v-select>
          </b-col>
          <b-col cols="2">
            <b-input v-model="form.starter2Qt" style="font-size:80%" type="number" min="1" :max="this.form.menuMaxReservations" required></b-input>
          </b-col>
        </b-row>
        <br>

        <b-row style="font-family: Fredoka regular">
          <b-col cols="10">Prato Principal</b-col>
           <b-col cols="2">Qtd.</b-col>
        </b-row>
        <b-row no-gutters style="font-family: Fredoka light">
          <b-col cols="10">
            <v-select v-model="form.dishMain1" :options="getMainDishForSelect" style="font-size:80%;" required></v-select>
          </b-col>
          <b-col cols="2">
            <b-input v-model="form.main1Qt" style="font-size:80%" type="number" min="1" :max="this.form.menuMaxReservations" required></b-input>
          </b-col>
        </b-row>
        <b-row no-gutters style="margin-top:3%;font-family: Fredoka light">
          <b-col cols="10">
            <v-select v-model="form.dishMain2" :options="getMainDishForSelect" style="font-size:80%;" required></v-select>
          </b-col>
          <b-col cols="2">
            <b-input  v-model="form.main2Qt" style="font-size:80%" type="number" min="1" :max="this.form.menuMaxReservations" required></b-input>
          </b-col>
        </b-row>
        <br>

        <b-row style="font-family: Fredoka regular">
          <b-col cols="10">Sobremesa</b-col>
           <b-col cols="2">Qtd.</b-col>
        </b-row>
        <b-row no-gutters style="font-family: Fredoka light">
          <b-col cols="10">
            <v-select v-model="form.dishDessert1" :options="getDessertDishForSelect" style="font-size:80%;"></v-select>
          </b-col>
          <b-col cols="2">
            <b-input  v-model="form.dessert1Qt" style="font-size:80%" type="number" :max="this.form.menuMaxReservations" min="1"></b-input>
          </b-col>
        </b-row>
        <b-row no-gutters style="margin-top:3%;font-family: Fredoka light">
          <b-col cols="10">
            <v-select v-model="form.dishDessert2" :options="getDessertDishForSelect" style="font-size:80%;"></v-select>
          </b-col>
          <b-col cols="2">
            <b-input v-model="form.dessert2Qt" style="font-size:80%" type="number" :max="this.form.menuMaxReservations" min="1"></b-input>
          </b-col>
        </b-row>
        <br>
        

        <b-row no-gutters>
          <b-col class="text-right" >
            <b-button @click="previousForm()" style="
                
                  width: 50%;
                  min-width: max-content;
                  background-color: #fc004c;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;
                " >Voltar</b-button>
          </b-col>
          <b-col style="margin-left:5%">
            <b-button @click="nextForm()" style="
              
                  width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;
                ">Seguinte</b-button>
          </b-col>
        
       </b-row>
      </div>
      <div id="form3" v-if="this.form3">
        <b-row style="font-family: Fredoka regular">
          <b-col ><strong>Data: </strong>{{this.form.date}}</b-col>
          <b-col><strong>Horário: </strong>{{isDinner()}}</b-col>
        </b-row>
        <b-row style="font-family: Fredoka regular">
          <b-col><strong>Preço: </strong>{{(Math.round(this.form.menuPrice * 100) / 100).toFixed(2)}}€</b-col>
          <b-col><strong>Reservas: </strong>{{this.form.menuMaxReservations}}</b-col>
        </b-row>
        <hr class="rounded" />

        <b-row >
          <b-col>
            <h6>Entradas</h6>
          </b-col>
        </b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%">
          <b-col>
            {{this.form.dishStarter1.label}}
          </b-col>
        </b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%">
          <b-col>
            {{this.form.dishStarter2.label}}
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col><h6>Prato Principal</h6></b-col> 
          </b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%"><b-col>{{this.form.dishMain1.label}}</b-col></b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%"><b-col>{{this.form.dishMain2.label}}</b-col></b-row>
        <br>

        <b-row><b-col><h6>Sobremesa</h6></b-col></b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%"><b-col>{{this.form.dishDessert1.label}}</b-col></b-row>
        <b-row style="font-family:Fredoka regular;margin-left:1%"><b-col>{{this.form.dishDessert2.label}}</b-col></b-row>

       
      </div>
      <br>
      
  <b-row v-if="this.form3" no-gutters>
    <b-col class="text-right">
        <b-button @click="previousForm()" style="width: 50%;
                  min-width: max-content;
                  background-color: #fc004c;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;" >Voltar</b-button>
    </b-col>
    <b-col style="margin-left:5%">
      <b-button   type="Submit" style=" width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;">Criar</b-button>

    </b-col>
  </b-row>
       
      
    </form>

  </b-modal>

  <!--DISH MODAL(EDIT)-->
  <b-modal id="dishModal" @show="getActiveDish"  centered hide-footer>
    <b-form @submit.prevent="updateDish()">
      <b-row style="font-family:Fredoka regular">
        <b-col>
          <label for="">ID</label>
        </b-col>
      </b-row>
      <b-row style="font-family:Fredoka light">
        <b-col>
          <b-form-input v-model="editDish.id" disabled></b-form-input>
        </b-col>
      </b-row>
      <b-row style="font-family:Fredoka regular;margin-top:1%">
        <b-col>
          <label for="">Nome do prato</label>
        </b-col>
      </b-row>
      <b-row style="font-family:Fredoka light">
        <b-col>
          <b-form-input v-model="editDish.name"></b-form-input>
        </b-col>
      </b-row>
      <br>
      
      <div>
      <input type="file" @change="previewImages" accept="image/*" >                
    </div>
    <div>
      <p>Progresso: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <div v-if="imageData!=null">                     
        <img style="margin:auto;display:block" class="preview" width="200px" height="150px" :src="picture">
        <br>
         <b-button type="button" @click="onUpload"
         style="margin:auto;display:block;width:60%;margin-top:2%;background-color:#fca311;border:none;font-family:Fredoka medium"
         >Carregar imagem</b-button>
    </div> 
     
         
      <b-row style="font-family:Fredoka regular;margin-top:1%">
        <b-col>
          <label for="">Tipo de prato</label>
        </b-col>
      </b-row>
      <b-row style="font-family:Fredoka light">
        <b-col>
          <b-form-select id="dishType"  v-model="editDish.courseId" :options="options" required >
          </b-form-select>
        </b-col>
      </b-row>
      <br>
     
      <b-row>
        <b-col class="text-right">
           <b-button style="width: 50%;
                  min-width: max-content;
                  background-color: #fc004c;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;" variant="danger" @click="deletePrato(editDish.id)">Apagar Prato</b-button>
          
        </b-col>
        <b-col>
          <b-button style=" width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;" type="submit" 
                  :disabled="picture ==null || imageData ==null"
                  >Guardar</b-button>

        </b-col>
      </b-row>
    </b-form>
  </b-modal>

  <!--MENU MODAL FOR USER AND EDIT MENU MODAL FOR ADMIN-->
  <b-modal id="menuModal" @show="getActiveMenu" hide-footer hide-header centered>
    <!--FULL MENU DATA-->
    <div v-if="!isLoggedAdmin()">
      <b-row no-gutters style="font-family:Fredoka Regular">
        <b-col cols="5" style="margin-top: 4px">
          <b-img id="menuDateImg" src="../assets/icons/calendar24.png"></b-img>
          <span id="menuDate" > {{ editMenu.startDate }}</span>
        </b-col>
        <b-col cols="4" style="margin-top: 3px">
          <b-img id="menuTimeImg" src="../assets/icons/clock24.png"></b-img>
          <span id="menuTime"> {{ editMenu.time }}H</span>
        </b-col>
        <b-col style="margin-top: 3px">
          <b-img
            id="menuPriceImg"
            src="../assets/icons/money24.png"
            style="margin-right: 5px"
          ></b-img>
          <span id="menuPrice">{{ editMenu.price }}</span></b-col
        >
      </b-row>
    <hr>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.starter1.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.starter1.name}}
      </b-col>
    </b-row>
    <br>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.starter2.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.starter2.name}}
      </b-col>
    </b-row>
    <hr>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.main1.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.main1.name}}
      </b-col>
    </b-row>
    <br>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.main2.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.main2.name}}
      </b-col>
    </b-row>
    <hr>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.dessert1.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.dessert1.name}}
      </b-col>
    </b-row>
    <br>
    <b-row no-gutters style="font-family:Fredoka Regular">
      <b-col style="max-width:max-content">
        <b-img :src="this.editMenu.dessert2.imageReference" width="80%" height="50%" style="border-radius:20%"></b-img>
      </b-col>
      <b-col style="margin:auto;display:block" class="col-md- align-self-center" cols="8">
      {{this.editMenu.dessert2.name}}
      </b-col>
    </b-row>
    <hr>

    </div>

    <div v-else>
      <b-row no-gutters>
        <b-col cols="5" style="margin-right:2%">
         
          Data
        </b-col>
        <b-col style="margin-right:2%"  >
          Hora
        </b-col>
        <b-col >
         Preço</b-col>

      </b-row>
      <b-row no-gutters >
        <b-col cols="5" style="margin-right:2%">
         
          <b-form-input  v-model="editMenu.startDate"></b-form-input>
        </b-col>
        <b-col style="margin-right:2%"  >
          <b-form-input v-model="editMenu.time"></b-form-input>
        </b-col>
        <b-col >
         <b-form-input v-model="editMenu.price"></b-form-input></b-col
        >
      </b-row>
      <br>
      <b-row>
        <b-col>
          Nº Reservas
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-input v-model="editMenu.openReservations"></b-form-input>
        </b-col>
      </b-row>
      <br>

      <b-row>
        <b-col>
          <h6>Entradas</h6>
        </b-col>
        <b-col cols="2">
          <h6>Qtd.</h6>
        </b-col>
      </b-row>
    
      <b-row no-gutters>
      
        <b-col>
          <v-select v-model="editMenu.vSelectStarter1" :options="getStarterDishForSelect"></v-select>
        </b-col>
         <b-col cols="2">
            <b-input v-model="editMenu.starter1Qtd"  style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
      </b-row>
    <br>
    <b-row no-gutters>
      
      <b-col>
        <v-select v-model="editMenu.vSelectStarter2" :options="getStarterDishForSelect"></v-select>
        
      </b-col>
      <b-col cols="2">
            <b-input  v-model="editMenu.starter2Qtd" style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
    </b-row>
    <hr>
    <b-row>
        <b-col>
          <h6>Pratos Principais</h6>
        </b-col>
        <b-col cols="2">
          <h6>Qtd.</h6>
        </b-col>
      </b-row>
    <b-row no-gutters>
     
      <b-col>
        <v-select v-model="editMenu.vSelectMain1" :options="getMainDishForSelect"></v-select>
      </b-col>
      <b-col cols="2">
            <b-input  v-model="editMenu.main1Qtd"  style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
    </b-row>
    <br>
    <b-row no-gutters>
      
     <b-col>
        <v-select v-model="editMenu.vSelectMain2" :options="getMainDishForSelect"></v-select>
      </b-col>
      <b-col cols="2">
            <b-input  v-model="editMenu.main2Qtd" style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
    </b-row>
    <hr>
    <b-row>
        <b-col>
          <h6>Sobremesa</h6>
        </b-col>
        <b-col cols="2">
          <h6>Qtd.</h6>
        </b-col>
      </b-row>
    <b-row no-gutters>
      
      <b-col>
        <v-select v-model="editMenu.vSelectDessert1" :options="getDessertDishForSelect"></v-select>
      </b-col>
      <b-col cols="2">
            <b-input  v-model="editMenu.dessert1Qtd" style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
    </b-row>
    <br>
    <b-row no-gutters >
      
      <b-col>
        <v-select v-model="editMenu.vSelectDessert2" :options="getDessertDishForSelect"></v-select>
      </b-col>
      <b-col cols="2">
            <b-input  v-model="editMenu.dessert2Qtd" style="font-size:80%"  type="number" min="1" required></b-input>
          </b-col>
    </b-row>
    <hr>




      <b-row>
       <b-button  style="margin:auto;display:block;width:60%;min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;">Guardar</b-button>
    </b-row>
    </div>

    


   
   

  </b-modal>
  </div>
</template>

<script>
import MenusCard from "../components/MenusCard.vue";
import DishesCard from "../components/DishCard.vue";
import firebase from "firebase";
//import { getStorage, ref } from "firebase/storage";
//import * as firebase  from "firebase";

export default {
  name: "Menus",
  components: {
    MenusCard,
    DishesCard,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(30);
    return {
      minDate: minDate,
      maxDate: maxDate,
      ordem: null,
      estado: null,
      users: [],
      imageData: null,
      picture: null,
      uploadValue: 0,
      previewImage: null,
      isImageValid: null,
      img1: null,
      options: [
        { value: 2, text: "Prato Principal" },
        { value: 1, text: "Entrada" },
        { value: 3, text: "Sobremesa" },
      ],
      dishName: "",
      dishType: "2",
      form1: true,
      form2: false,
      form3: false,
      form: {
        date: "",
        selected: "1",
        menuPrice: null,
        menuMaxReservations: 20,
        dishStarter1: "",
        starter1Qt: 1,
        dishStarter2: "",
        starter2Qt: 1,
        dishMain1: "",
        main1Qt: 1,
        dishMain2: "",
        main2Qt: 1,
        dishDessert1: "",
        dessert1Qt: 1,
        dishDessert2: "",
        dessert2Qt: 1,
      },
      startTime: "",
      endTime: "",

      options2: [
        { text: "Almoço", value: "1" },
        { text: "Jantar", value: "2" },
      ],

      editDish: {
        id: "",
        name: "",
        imageReference: null,
        courseId: "",
        isALaCarte: null,
      },
      editMenu: {
        id: "",
        startDate: "",
        time: "",
        price: "",
        openReservations: "",
        dishes: [],
        starter1: {},
        starter2: {},
        main1: {},
        main2: {},
        dessert1: {},
        dessert2: {},
        vSelectStarter1: "",
        starter1Qtd: 1,
        vSelectStarter2: "",
        starter2Qtd: 1,
        vSelectMain1: "",
        main1Qtd: 1,
        vSelectMain2: "",
        main2Qtd: 1,
        vSelectDessert1: "",
        dessert1Qtd: 1,
        vSelectDessert2: "",
        dessert2Qtd: 1,
      },
      menuDate: now.toISOString().substring(0, 10),
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
    getMenuModalTitle() {
      let modalTitle = "";
      if (this.form1) {
        modalTitle = "Informação Geral";
      } else if (this.form2) {
        modalTitle = "Pratos";
      } else if (this.form3) {
        modalTitle = "Confirme os dados do menu";
      }

      return modalTitle;
    },

    nextForm() {
      if (this.form1) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;
      } else if (this.form2) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;
      }
    },
    previousForm() {
      if (this.form2) {
        this.form1 = true;
        this.form2 = false;
        this.form3 = false;
      } else if (this.form3) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;
      }
    },
    isForm1Done() {
      if (
        !this.form.date ||
        !this.form.menuPrice ||
        !this.form.menuMaxReservations
      ) {
        return true;
      } else {
        return false;
      }
    },
    isDinner() {
      if (this.form.selected == 1) {
        return "Almoço";
      } else if (this.form.selected == 2) {
        return "Jantar";
      }
    },
    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },
    previewImageNull() {
      this.previewImage = null;
    },
    dishImageNull() {
      this.editDish.imageReference = null;
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

    async createDish() {
      let dish = {
        name: this.dishName,
        courseId: this.dishType,
        isALaCarte: false,
        imageReference: this.picture,
      };

      console.log(dish);

      this.$bvModal
        .msgBoxConfirm("Quer Criar o prato?", {
          title: "Criação de prato",
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
            this.$store.dispatch("createDish", dish);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    createMenu() {
      if (this.form.selected == 1) {
        this.startTime = "13:00";
        this.endTime = "14:00";
      }
      if (this.form.selected == 2) {
        this.startTime = "21:00";
        this.endTime = "22:00";
      }
      let menuPrice = parseFloat(
        (Math.round(this.form.menuPrice * 100) / 100).toFixed(2)
      );
      let menu = {
        startDate: this.form.date + " " + this.startTime,
        endDate: this.form.date + " " + this.endTime,
        price: menuPrice,
        openReservations: this.form.menuMaxReservations,
        dishes: [
          {
            id: this.form.dishStarter1.code,
            menuDish: {
              dishQuantity: this.form.starter1Qt,
            },
          },
          {
            id: this.form.dishStarter2.code,
            menuDish: {
              dishQuantity: this.form.starter2Qt,
            },
          },
          {
            id: this.form.dishMain1.code,
            menuDish: {
              dishQuantity: this.form.main1Qt,
            },
          },
          {
            id: this.form.dishMain2.code,
            menuDish: {
              dishQuantity: this.form.main2Qt,
            },
          },
          {
            id: this.form.dishDessert1.code,
            menuDish: {
              dishQuantity: this.form.dessert1Qt,
            },
          },
          {
            id: this.form.dishDessert2.code,
            menuDish: {
              dishQuantity: this.form.dessert2Qt,
            },
          },
        ],
      };
      console.log(menu);
      this.$bvModal
        .msgBoxConfirm("Quer criar o menu?", {
          title: "Criação de menu",
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
            this.$store.dispatch("createMenu", menu);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getActiveDish() {
      let dish = this.$store.getters.getDishById;

      this.editDish.id = dish.id;
      this.editDish.name = dish.name;
      this.editDish.isALaCarte = dish.isALaCarte;
      this.editDish.imageReference = dish.imageReference;
      this.editDish.courseId = dish.course.id;
    },
    async updateDish() {
      let dish = {
        name: this.editDish.name,
        isALaCarte: this.editDish.isALaCarte,
        imageReference: this.picture,
        courseId: this.editDish.courseId,
      };

      this.$bvModal
        .msgBoxConfirm("Quer editar o prato?", {
          title: "Edição de prato",
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
            this.$store.dispatch("updateDish", dish);
            this.$store.dispatch("getAllDishes");
            setTimeout(() => {
              this.$bvModal.hide("dishModal");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deletePrato(id) {
      this.$bvModal
        .msgBoxConfirm("Quer apagar o prato?", {
          title: "Apagar prato",
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
            this.$store.dispatch("deleteDish", id);
            this.$store.dispatch("getAllDishes");
            setTimeout(() => {
              this.$bvModal.hide("dishModal");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getActiveMenu() {
      let menu = this.$store.getters.getActiveMenu;
      let main = this.$store.getters.getActiveMenuMain;
      let starter = this.$store.getters.getActiveMenuStarter;
      let dessert = this.$store.getters.getActiveMenuDessert;

      this.editMenu.id = menu.id;
      this.editMenu.startDate = menu.startDate.slice(0, 10);
      this.editMenu.time = menu.startDate.slice(11, 16);
      this.editMenu.openReservations = menu.openReservations;
      this.editMenu.price = menu.price + "€";
      this.editMenu.dishes = menu.dishes;

      this.editMenu.starter1 = starter[0];
      this.editMenu.starter2 = starter[1];
      this.editMenu.starter1Qtd = starter[0].menuDish.dishQuantity;
      this.editMenu.starter2Qtd = starter[1].menuDish.dishQuantity;

      this.editMenu.main1 = main[0];
      this.editMenu.main2 = main[1];
      this.editMenu.main1Qtd = main[0].menuDish.dishQuantity;
      this.editMenu.main2Qtd = main[1].menuDish.dishQuantity;

      this.editMenu.dessert1 = dessert[0];
      this.editMenu.dessert2 = dessert[1];
      this.editMenu.dessert1Qtd = dessert[0].menuDish.dishQuantity;
      this.editMenu.dessert2Qtd = dessert[1].menuDish.dishQuantity;

      this.editMenu.vSelectStarter1 = {
        code: starter[0].id,
        label: starter[0].name,
      };
      this.editMenu.vSelectStarter2 = {
        code: starter[1].id,
        label: starter[1].name,
      };

      this.editMenu.vSelectMain1 = {
        code: main[0].id,
        label: main[0].name,
      };
      this.editMenu.vSelectMain2 = {
        code: main[1].id,
        label: main[1].name,
      };

      this.editMenu.vSelectDessert1 = {
        code: dessert[0].id,
        label: dessert[0].name,
      };
      this.editMenu.vSelectDessert2 = {
        code: dessert[1].id,
        label: dessert[1].name,
      };

      /*
      this.editMenu.starter1 = menu.dishes[0];
      this.editMenu.starter2 = menu.dishes[1];
      this.editMenu.starter1Qtd = menu.dishes[0].menuDish.dishQuantity;
      this.editMenu.starter2Qtd = menu.dishes[1].menuDish.dishQuantity;
      this.editMenu.main1Qtd = menu.dishes[2].menuDish.dishQuantity;
      this.editMenu.main2Qtd = menu.dishes[3].menuDish.dishQuantity;
      this.editMenu.dessert1Qtd = menu.dishes[4].menuDish.dishQuantity;
      this.editMenu.dessert2Qtd = menu.dishes[5].menuDish.dishQuantity;
      

      this.editMenu.vSelectStarter1 = {
        code: menu.dishes[0].id,
        label: menu.dishes[0].name,
      };
      this.editMenu.vSelectStarter2 = {
        code: menu.dishes[1].id,
        label: menu.dishes[1].name,
      };

      this.editMenu.main1 = menu.dishes[2];
      this.editMenu.main2 = menu.dishes[3];
      this.editMenu.vSelectMain1 = {
        code: menu.dishes[2].id,
        label: menu.dishes[2].name,
      };
      this.editMenu.vSelectMain2 = {
        code: menu.dishes[3].id,
        label: menu.dishes[3].name,
      };
      this.editMenu.dessert1 = menu.dishes[4];
      this.editMenu.dessert2 = menu.dishes[5];
      this.editMenu.vSelectDessert1 = {
        code: menu.dishes[4].id,
        label: menu.dishes[4].name,
      };
      this.editMenu.vSelectDessert2 = {
        code: menu.dishes[5].id,
        label: menu.dishes[5].name,
      };
      */
    },
    previewImages(event) {
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
    getAllMenus() {
      /*  
      console.log(this.$store.getters.getAllMenus);
      return this.$store.getters.getAllMenus;*/
      return this.$store.getters.getAllMenusFiltered(this.menuDate);
    },
    getAllDishes() {
      console.log(this.$store.getters.getAllDishes.rows);
      return this.$store.getters.getAllDishes.rows;
    },
    getStarterDishForSelect() {
      console.log(this.$store.getters.getStarterDishForSelect);
      return this.$store.getters.getStarterDishForSelect;
    },
    getMainDishForSelect() {
      console.log(this.$store.getters.getMainDishForSelect);
      return this.$store.getters.getMainDishForSelect;
    },
    getDessertDishForSelect() {
      console.log(this.$store.getters.getDessertDishForSelect);
      return this.$store.getters.getDessertDishForSelect;
    },
  },
};
</script>

<style>
.uploading-image {
  display: flex;
}
</style>
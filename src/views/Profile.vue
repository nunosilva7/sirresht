<template>
  <div class="profile">
    <!-- USER PAGE -->
    <div v-if="!isLoggedAdmin()">
      <h1 style="text-align: center">
        Bem Vindo, {{ getLoggedUserInformation.firstName }}
      </h1>
      <br />
      <br />

      <div style="margin-top: 5%">
        <div
          id="nextReservationContainer"
          style="margin-left: 10%; margin-right: 5%; width: 510px; float: left"
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

          <b-row v-if="Number.isInteger(getNextReservation.id)">
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
            margin-right: 5%;
            margin-top: 0.1%;
            width: 510px;
            float: left;
          "
        >
          <b-row>
            <b-col>
              <h1 id="menuTitle">Menu em Destaque</h1>
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
          <br />
          <br />
          <br />

          <br />
        </div>
      </div>

      <b-modal
        id="reservationModal"
        hide-footer
        centered
        :title="getModalTitle()"
      >
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
                  no-flip
                  weekday-header-format="narrow"
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
                    style="font-family: Fredoka regular"
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
            style="min-height: 200px; height: 24rem; overflow-y: auto"
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
                <b-col
                  cols="8"
                  style="
                    margin-top: auto;
                    margin-bottom: auto;
                    font-family: Fredoka regular;
                    font-size: 20px;
                    color: #938f8a;
                  "
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
                  style="
                    cursor: pointer;
                    color: #fca311;
                    font-family: Fredoka regular;
                  "
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
            <div>
              <b-form-group
                label="Tipo de mesa"
                v-slot="{ ariaDescribedby }"
                style="margin-left: 5%; font-family: Fredoka Regular"
                required
              >
                <b-form-radio
                  v-model="selectedTable"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="1"
                  style="margin-left: 5%; font-family: Fredoka Regular"
                  >Privada</b-form-radio
                >
                <b-form-radio
                  v-model="selectedTable"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="2"
                  style="margin-left: 5%; font-family: Fredoka Regular"
                  >Partilhada</b-form-radio
                >
              </b-form-group>
            </div>
          </div>
          <div
            id="formMessage"
            v-if="this.formMessage"
            style="min-height: 200px; height: 15rem; overflow-y: auto"
          >
            <h6>Observações</h6>
            <b-form-textarea
              id="textarea-rows"
              placeholder="Observações"
              rows="8"
              v-model="message"
            ></b-form-textarea>
          </div>
          <div
            id="form4"
            v-if="this.form4"
            style="min-height: 400px; height: 24rem; overflow-y: auto"
          >
            <div
              id="participantsMenu"
              v-for="participant in this.participants"
              :key="participant.id"
              style="
                position: relative;
                display: block;
                margin: auto;
                width: 90%;
                border: solid thin #c8c4c4;
                margin-bottom: 4%;
                border-radius: 15px;
                box-shadow: -2px 5px 10px #888888;
              "
            >
              <b-row style="margin-left: 1%">
                <b-col style="margin-top: 1%">
                  <h6
                    style="
                      font-family: Fredoka regular;
                      font-size: 20px;
                      color: #938f8a;
                      min-width: max-content;
                    "
                  >
                    {{ participant.firstName + " " + participant.lastName }}
                  </h6>
                </b-col>
                <b-col style="margin-top: 1%" class="text-center">
                  <h6
                    v-if="participant.menuPrice != null"
                    style="font-family: Fredoka regular; font-size: 15px"
                  >
                    {{ participant.menuPrice }}€
                  </h6>
                </b-col>
              </b-row>
              <div
                v-if="participant.dishesIds[1] != null"
                style="
                  font-family: Fredoka regular;
                  font-size: 14px;
                  color: #000000;
                "
              >
                <b-row style="margin-left: 5%">
                  <b-col v-if="participant.dishesIds[0] != null">{{
                    getDish(participant.dishesIds[0])
                  }}</b-col>
                </b-row>
                <b-row style="margin-left: 5%">
                  <b-col v-if="participant.dishesIds[1] != null">{{
                    getDish(participant.dishesIds[1])
                  }}</b-col>
                </b-row>
                <b-row style="margin-left: 5%">
                  <b-col v-if="participant.dishesIds[2] != null">{{
                    getDish(participant.dishesIds[2])
                  }}</b-col>
                </b-row>
              </div>
              <div
                v-else
                style="
                  position: absolute;
                  bottom: 0%;
                  left: 20%;
                  color: #fca311;
                "
              >
                <h6 style="font-family: Fredoka regular; font-size: 15px">
                  Adicione os seus pratos
                </h6>
              </div>
              <b-img
                style="
                  width: 24px;
                  height: 24px;
                  cursor: pointer;
                  display: block;
                  margin-left: auto;
                  margin-right: 2%;
                  margin-bottom: 2%;
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
                  <!--1 +
                        getMenusByDate.findIndex((element) => {
                          return element.id === menu.id;
                        }) -->
                  <b-tab
                    v-for="menu in getMenusByDate"
                    :key="menu.id"
                    :title="'Menu ' + menu.price + '€'"
                    :disabled="menu.openReservations - menuQuantityController(menu.id) <=0"
                   
                    @click="clearOptions()"
                  >
                    <b-form
                      @submit.prevent="pickDishes(participant_id, menu.id)"
                    >
                      <b-row>
                        <div>
                          <h6>Entrada</h6>
                          <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group id="starter">
                              <b-row>
                                <b-form-radio
                                  v-model="starter"
                                  :aria-describedby="ariaDescribedby"
                                  name="some-radios"
                                  value="0"
                                  required
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuStarter(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuStarter(menu.id)[0].id) <=0"
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
                                  required
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuStarter(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuStarter(menu.id)[1].id) <=0"
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
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuMain(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuMain(menu.id)[0].id) <=0"
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
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuMain(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuMain(menu.id)[1].id) <=0"
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
                                  required
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuDessert(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuDessert(menu.id)[0].id) <=0"
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
                                  required
                                  style="
                                    font-family: Fredoka regular;
                                    font-size: 14px;
                                  "
                                  :disabled="menuDessert(menu.id)[0].menuDish.dishQuantity - dishQuantityController(menu.id, menuDessert(menu.id)[1].id) <=0"
                                  >{{
                                    menuDessert(menu.id)[1].name
                                  }}</b-form-radio
                                >
                              </b-row>
                            </b-form-radio-group>
                          </b-form-group>
                        </div>
                      </b-row>
                      <b-button
                        style="
                          position: absolute;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          top:108%
                          min-width: max-content;
                          background-color: #fca311;
                          border: none;
                        "
                        type="submit"
                        >Adicionar</b-button
                      >
                    </b-form>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-form>
          </div>

          <div id="form6" v-if="this.form6">
            <div
              id="participantsMenu"
              v-for="participant in this.participants"
              :key="participant.id"
              style="
                position: relative;
                display: block;
                margin: auto;
                width: 90%;
                border: solid thin #c8c4c4;
                margin-bottom: 4%;
                border-radius: 15px;
                box-shadow: -2px 5px 10px #888888;
              "
            >
              <b-row style="margin-left: 1%">
                <b-col style="margin-top: 1%">
                  <h6
                    style="
                      font-family: Fredoka regular;
                      font-size: 20px;
                      color: #938f8a;
                      min-width: max-content;
                    "
                  >
                    {{ participant.firstName + " " + participant.lastName }}
                  </h6>
                </b-col>
                <b-col style="margin-top: 1%" class="text-center">
                  <h6
                    v-if="
                      participant.menuPrice != null &&
                      participant.discount_id != 3
                    "
                    style="
                      text-decoration: line-through;
                      display: inline;
                      font-family: Fredoka regular;
                      font-size: 15px;
                    "
                  >
                    {{ participant.menuPrice }}€
                  </h6>
                  <h6
                    v-if="participant.discount_id != 3"
                    style="
                      margin-left: 2%;
                      display: inline;
                      color: #fca311;
                      font-family: Fredoka medium;
                    "
                  >
                    {{ calculateDiscount(participant.id) }}€
                  </h6>

                  <h6
                    v-else
                    style="
                      margin-left: 2%;
                      display: inline;
                      color: #fca311;
                      font-family: Fredoka medium;
                    "
                  >
                    {{ participant.menuPrice }}€
                  </h6>
                </b-col>
              </b-row>
              <div
                v-if="participant.dishesIds[1] != null"
                style="margin-bottom: 2%"
              >
                <b-row style="margin-left: 5%">
                  <b-col
                    v-if="participant.dishesIds[0] != null"
                    style="
                      font-family: Fredoka regular;
                      font-size: 14px;
                      color: #000000;
                    "
                    >{{ getDish(participant.dishesIds[0]) }}</b-col
                  >
                </b-row>
                <b-row style="margin-left: 5%">
                  <b-col
                    v-if="participant.dishesIds[1] != null"
                    style="
                      font-family: Fredoka regular;
                      font-size: 14px;
                      color: #000000;
                    "
                    >{{ getDish(participant.dishesIds[1]) }}</b-col
                  >
                </b-row>
                <b-row style="margin-left: 5%">
                  <b-col
                    v-if="participant.dishesIds[2] != null"
                    style="
                      font-family: Fredoka regular;
                      font-size: 14px;
                      color: #000000;
                    "
                    >{{ getDish(participant.dishesIds[2]) }}</b-col
                  >
                </b-row>
              </div>
              <div
                v-else
                style="
                  position: absolute;
                  bottom: 0%;
                  left: 20%;
                  color: #fca311;
                "
              ></div>
            </div>

            <b-row>
              <b-col></b-col>
              <b-col
                style="
                  font-family: Fredoka regular;
                  font-size: 18px;
                  color: #000000;
                "
                >Subtotal: {{ calculateReservationPrice() }}€</b-col
              >
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col
                style="
                  font-family: Fredoka regular;
                  font-size: 18px;
                  color: #000000;
                "
                >Desconto: {{ discountSum() }}€
              </b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col
                style="
                  font-family: Fredoka regular;
                  font-size: 18px;
                  color: #000000;
                "
                >Total: {{ calculateTotal() }}€</b-col
              >
            </b-row>

            <br />
          </div>

          <b-row>
            <div class="row px-5">
              <label>{{ formError }}</label>
            </div>
          </b-row>
          <br />
          <br />
          <br />
          <b-row class="justify-content-md-center" no-gutters>
            <b-col v-if="!this.form1 && !this.form5">
              <b-button
                style="
                  position: absolute;
                  right: 15%;
                  width: 50%;
                  min-width: max-content;
                  background-color: #fc004c;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;
                "
                @click="showPreviousForm()"
                v-if="!this.form1 && !this.form5"
                >Voltar</b-button
              >
            </b-col>
            <b-col v-if="!this.form6">
              <b-button
                style="
                  margin: auto;
                  display: block;
                  width: 60%;
                  margin-top: 0%;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                "
                @click="showNextForm()"
                v-if="!this.date"
                disabled
                >Seguinte</b-button
              >
              <b-button
                style="
                  margin: auto;
                  display: block;
                  width: 60%;
                  margin-top: 0%;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                "
                @click="showNextForm()"
                v-if="this.date && this.form1"
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
                  font-family: Fredoka medium;
                  font-size: 15px;
                "
                @click="showNextForm()"
                v-else-if="this.form4"
                :disabled="!areDishesPicked()"
                >Seguinte</b-button>

              <b-button
                style="
                  position: absolute;
                  left: 15%;
                  width: 50%;
                  min-width: max-content;
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;
                "
                @click="showNextForm()"
                v-else-if="!this.form6 && !this.form5 && !this.form1"
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
                  background-color: #fca311;
                  border: none;
                  font-family: Fredoka medium;
                  font-size: 15px;
                "
                @click="Reservation()"
                variant="danger"
                :disabled="this.clickReservation"
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
        ok-only
        centered
        hide-footer
        headerClass="p-2 border-bottom-0"
      >
        <div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="radio-group-2"
              v-model="typeUser"
              :aria-describedby="ariaDescribedby"
              name="radio-sub-component"
            >
              <b-form-radio value="0">Utilizador</b-form-radio>
              <b-form-radio value="1">Convidado</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>

        <div id="addUser" v-if="this.typeUser == 0">
          <b-form @submit.prevent="" id="f">
            <b-row style="margin-bottom: 5%">
              <b-col>
                <b-form-input v-model="email" placeholder="Escreve o email">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  style="
                    margin: auto;
                    display: block;
                    min-width: max-content;
                    background-color: #fca311;
                    border: none;
                  "
                  @click="checkParticipant()"
                  >Adicionar</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </div>
        <div id="addGuest" v-else>
          Convidado
          <b-form @submit.prevent="" id="f">
            <b-row style="margin-bottom: 5%">
              <b-col>
                <b-form-input v-model="email" placeholder="Escreve o email">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  style="
                    margin: auto;
                    display: block;
                    min-width: max-content;
                    background-color: #fca311;
                    border: none;
                  "
                  @click="checkParticipant()"
                  >Adicionar</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </div>
      </b-modal>

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
                        <b-button type="submit">Adicionar</b-button>
                      </b-form-group>
                    </div>
                  </b-row>
                </b-form>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-form>
      </b-modal>
      

      <!--Open nextReservationModal with all reservation information  -->
      <b-modal
        v-if="Number.isInteger(getNextReservation.id)"
        id="nextReservationModal"
        centered
        hide-footer
      >
        <b-row class="text-center" style="font-family: Fredoka Medium">
          <b-col>
            <h4 style="font-family: Fredoka Medium">
              Reserva {{ getActiveReservation().id }}
            </h4>
          </b-col>
        </b-row>
        <b-row style="margin-bottom: 5%" class="text-center">
          <b-col
            id="nextReservationStatus"
            ref="nextReservationStatus"
            :style="statusStyleColor"
          >
            {{ getNextReservationStatus() }}
          </b-col>
        </b-row>
        <b-row
          style="font-family: Fredoka Regular; margin: auto; margin-bottom: 2%"
        >
          <b-col>Data: {{ getNextReservationDate() }}</b-col>
          <b-col
            >Preço total: {{ getActiveReservation().reservationPrice }}€
          </b-col>
        </b-row>
        <b-row
          style="font-family: Fredoka Regular; margin: auto; margin-bottom: 2%"
        >
          <b-col>Hora: {{ getNextReservationTime() }}</b-col>
          <b-col style="min-width: max-content"
            >Pagamento: {{ isReservationPaid() }}</b-col
          >
        </b-row>
        <b-row
          v-if="getActiveReservation().suplementsPrice != null"
          style="font-family: Fredoka Regular; margin: auto; margin-bottom: 2%"
        >
          <b-col
            >Suplementos: {{ getActiveReservation().suplementsPrice }}</b-col
          >
        </b-row>
        <b-row
          v-else
          style="font-family: Fredoka Regular; margin: auto; margin-bottom: 2%"
        >
          <b-col>Suplementos: 0.00€</b-col>
        </b-row>
        <div style="margin-top: 5%">
          <b-row
            no-gutters
            v-b-toggle="'collapse-1'"
            @click="changeIcon()"
            style="max-width: max-content; margin: auto"
            v-if="this.icon"
          >
            <b-col style="max-width: max-content">
              <h6 style="min-width: max-content">
                Participantes ({{ getNextReservation.participants.length }})
              </h6>
            </b-col>
            <b-col>
              <b-icon
                style="margin-bottom: 20%; margin-left: 20%"
                :icon="this.icon"
              ></b-icon>
            </b-col>
          </b-row>

          <b-collapse id="collapse-1">
            <b-container fluid>
              <b-row style="margin-right: 5%; margin-left: 5%">
                <div
                  v-for="participant in getActiveReservation().participants"
                  :key="participant.id"
                  style="
                    margin-right: 5%;
                    margin-left: 5%;
                    margin-top: 1%;
                    width: 40%;
                  "
                >
                  <h6 style="text-align: center">{{ participant.name }}</h6>
                  <div style="width: max-content; margin: 0 auto">
                    <b-avatar
                      style="margin: auto"
                      id="participantsAvatar"
                      :src="participant.user.avatarReference"
                    ></b-avatar>
                  </div>
                </div>
              </b-row>
            </b-container>
          </b-collapse>
        </div>
        <br />
        <b-row
          no-gutters
          v-if="
            getNextReservationStatus() === 'Aprovada' ||
            getNextReservationStatus() === 'Pendente'
          "
        >
          <b-col class="text-right">
            <b-button
              @click="cancelReservation()"
              style="
                margin: auto;
                display: block;
                width: 60%;
                margin-top: 10%;
                min-width: max-content;
                background-color: #fc004c;
                border: none;
                font-family: Fredoka medium;
                font-size: 15px;
              "
              >Cancelar Reserva</b-button
            >
          </b-col>
        </b-row>
      </b-modal>
    </div>

    <!-- ADMIN PAGE -->
    <div v-else>ADMIN</div>
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
      menu_id: "",
      starter: null,
      main: null,
      dessert: null,
      dishes: [],
      icon: "arrow-down",
      message: "",

      selected: "1",
      selectedTable: "1",
      options: [
        { text: "Almoço", value: "1" },
        { text: "Jantar", value: "2" },
      ],
      selectedTime: "13:00",
      optionsTime: [
        { value: "13:00", text: "12:00H" },
        { value: "13:30", text: "12:30H" },
        { value: "14:00", text: "13:00H" },
        { value: "14:30", text: "13:30H" },
        { value: "15:00", text: "14:00H" },
      ],
      selectedTime2: "21:00",
      optionsTime2: [
        { value: "21:00", text: "20:00H" },
        { value: "21:30", text: "20:30H" },
        { value: "22:00", text: "21:00H" },
        { value: "22:30", text: "21:30H" },
        { value: "23:00", text: "22:00H" },
      ],
      date: null,
      context: null,

      form1: true,
      form2: false,
      form3: false,
      form4: false,
      form5: false,
      formMessage: false,
      form6: false,
      formError: "",
      loginData: {
        email: "",
        password: "",
      },
      typeUser: 0,
      finalOrder: [],
      totalPrice: null,
      clickReservation: false,

      statusStyleColor: {
        color: "black",
      },
    };
  },
  created: function () {
    this.PrepareData();
    this.isLoggedAdmin();
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
    changeIcon() {
      if (this.icon == "arrow-up") {
        this.icon = "arrow-down";
      } else if (this.icon == "arrow-down") {
        this.icon = "arrow-up";
      }
    },

    isLoggedAdmin() {
      return this.$store.getters.isLoggedAdmin;
    },

    openReservationModal() {
      this.$bvModal.show("reservationModal");
      this.clickReservation = false;
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
      this.participants[objIndex].menuPrice =
        this.getMenuById(menu_id)[0].price;
      console.log(this.getMenuById(menu_id)[0].price);
      this.participants[objIndex].menuId = menu_id;
      //this.$bvModal.hide("modal-multi-4");
      //this.$bvModal.show("reservationModal");
      this.form5 = false;
      this.form4 = true;
    },
    getAllMenusData() {
      const menus = this.$store.getters.getAllMenus;
      var menusDate = [];
      let menusAvailable = menus.filter((menu) => menu.openReservations > 0);

      for (let i = 0; i < menusAvailable.length; i++) {
        let date = menusAvailable[i].startDate.slice(0, 10);
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
        this.formMessage = false;
      } else if (this.form2) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form5 = false;
        this.formMessage = false;
      } else if (this.form3) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form5 = false;
        this.formMessage = false;
      } else if (this.form4) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = false;
        this.form6 = false;
        this.formMessage = true;
      } else if (this.formMessage) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = false;
        this.form6 = true;
        this.formMessage = false;
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
        this.form4 = false;
        this.form5 = false;
        this.form6 = false;
        this.formMessage = true;
      } else if (this.formMessage) {
        this.form1 = false;
        this.form2 = false;
        this.form3 = false;
        this.form4 = true;
        this.form6 = false;
        this.formMessage = false;
      }
    },
    getModalTitle() {
      let modalTitle = "";
      if (this.form1) {
        modalTitle = "Escolha a data";
      } else if (this.form2) {
        modalTitle = "Participantes";
      } else if (this.form4) {
        modalTitle = "Escolha os pratos";
      } else if (this.form5) {
        modalTitle = "Escolha os pratos";
      } else if (this.form6) {
        modalTitle = "Confirme a reserva";
      }
      return modalTitle;
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
      let reservationPrice;

      let arrayParticipant = [];
      for (let i = 0; i < this.participants.length; i++) {
        if (!this.participants[i].dishesIds) {
          console.log("falta pratos");
          err = true;
          break;
        }
        if (
          this.participants[i].discount_id == 1 ||
          this.participants[i].discount_id == 2
        ) {
          reservationPrice =
            this.participants[i].menuPrice -
            this.participants[i].menuPrice * 0.2;
          reservationPrice = (Math.round(reservationPrice * 100) / 100).toFixed(
            2
          );
        }
        if (this.participants[i].discount_id == 3) {
          reservationPrice = this.participants[i].menuPrice;
        }
        let obj = {
          userId: this.participants[i].id,
          reservationPrice: reservationPrice,
          discountId: this.participants[i].discount_id,
          dishesIds: this.participants[i].dishesIds,
          email: this.participants[i].email,
          name:
            this.participants[i].firstName +
            " " +
            this.participants[i].lastName,
        };

        arrayParticipant.push(obj);
      }
      if (!this.date || err === true) {
        console.log("falta data");
        this.$data.formError = "erro";
      } else {
        let time;
        if (this.selected == 1) {
          time = this.selectedTime;
        } else if (this.selected == 2) {
          time = this.selectedTime2;
        }
        let isCommunal = true;
        if (this.selectedTable == 1) {
          isCommunal = false;
        }
        let message;
        if (this.message == "") {
          message = "Não aplicável";
        }

        console.log(this.date + " " + this.selectedTime);
        const reservation = {
          startDate: this.date + " " + time,
          endDate: this.date + " " + time,
          reservationPrice: this.totalPrice,
          supplementsPrice: "0.00",
          message: message,
          isTableCommunal: isCommunal,
          participants: arrayParticipant,
        };
        console.log(reservation);

        //let openReservation = this.participants.length;

        this.$bvModal
          .msgBoxConfirm("Confirma os dados da reserva?", {
            title: "Confirmação da Reserva",
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
              this.clickReservation = true;
              this.$data.formError = "Reserva criada com sucesso";
              this.$store.dispatch("createReservation", reservation);
              this.updateMenuAndDishOpenReservations();

              setInterval(this.$bvModal.hide("reservationModal"), 2000);
              
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    clearData() {
      this.date = "";
      this.time = "";
      this.totalPrice = "";
      this.message = "";
      this.form6 = false;
      this.form1 = true;
      this.formError = "";
      let participant = this.getLoggedUserInformation;
      participant.dishesIds = [null, null, null];
      participant.menuPrice = null;
      this.participants = [];
      this.participants.push(participant);
    },
    getActiveReservation() {
      return this.$store.getters.getNextReservation;
    },
    calculateReservationPrice() {
      /*
      let dishesArray = [];
      for (let i = 0; i < this.participants.length; i++) {
        //dishesArray.push(this.participants[i].dishesIds)
        dishesArray = dishesArray.concat(this.participants[i].dishesIds);
      }

      const count = {};
      dishesArray.forEach((element) => {
        count[element] = (count[element] || 0) + 1;
      });
      this.finalOrder = Object.entries(count);*/
      let subTotal = 0;
      for (let i = 0; i < this.participants.length; i++) {
        subTotal += parseFloat(this.participants[i].menuPrice);
      }
      console.log(this.participants.length);
      return (Math.round(subTotal * 100) / 100).toFixed(2);
    },
    calculateDiscount(id) {
      let participant = this.participants.find(
        (participant) => participant.id == id
      );
      let finalMenuPrice;
      if (participant.discount_id == 1 || participant.discount_id == 2) {
        finalMenuPrice = participant.menuPrice - participant.menuPrice * 0.2;
        return (Math.round(finalMenuPrice * 100) / 100).toFixed(2);
      }
      if (participant.discount_id == 3) {
        return participant.menuPrice;
      }
    },
    discountSum() {
      let discountSum = 0;

      for (let i = 0; i < this.participants.length; i++) {
        if (
          this.participants[i].discount_id == 1 ||
          this.participants[i].discount_id == 2
        ) {
          let sum = this.participants[i].menuPrice * 0.2;
          discountSum += sum;
        }
      }
      console.log(discountSum);
      return (Math.round(discountSum * 100) / 100).toFixed(2);
    },
    calculateTotal() {
      let discount = this.discountSum();
      let subtotal = this.calculateReservationPrice();
      this.totalPrice = (Math.round((subtotal - discount) * 100) / 100).toFixed(
        2
      );

      return (Math.round((subtotal - discount) * 100) / 100).toFixed(2);
    },
    getNextReservationDate() {
      let date = String(this.getActiveReservation().startDate).slice(0, 10);
      //console.log("date " + this.getActiveReservation().startDate.slice(0, 10))
      return date;
    },

    getNextReservationTime() {
      let time = String(this.getActiveReservation().startDate).slice(11, 16);
      //console.log("time " + this.getActiveReservation().startDate.slice(0,10))
      return time;
    },
    getNextReservationStatus() {
      let status = this.getActiveReservation().status.id;

      //let statusColor = this.$refs.nextReservationStatus

      let statusString = "";
      switch (status) {
        case 1:
          statusString = "Pendente";
          this.statusStyleColor.color = "red";
          // console.log(statusColor)

          break;

        case 2:
          statusString = "Aprovada";
          this.statusStyleColor.color = "green";
          break;
        case 3:
          statusString = "Rejeitada";
          this.statusStyleColor.color = "red";
          break;
        case 4:
          statusString = "Cancelada";
          this.statusStyleColor.color = "red";
          break;
        case 5:
          statusString = "Concluído";
          this.statusStyleColor.color = "green";
          break;
        case 6:
          statusString = "Não comparência";
          this.statusStyleColor.color = "red";
          break;
        default:
          statusString = "Erro";
      }
      console.log(status);
      return statusString;
    },
    isReservationPaid() {
      let price = Number(this.getActiveReservation().reservationPrice);
      let amountReceived = Number(this.getActiveReservation().amountReceived);
      console.log("price " + price);
      console.log("paid " + amountReceived);

      if (amountReceived < price) {
        console.log("nao pago");
        return "Por pagar";
      }
      if (amountReceived == price) {
        console.log("pago");
        return "Pago";
      }
    },
    async cancelReservation() {
      let reservation = {
        reservationStatusId: 4,
        statusId: 4,
      };

      await this.$store.dispatch("updateReservationStatus", reservation);
    },
    async updateMenuAndDishOpenReservations() {
      let menuCount = Object.values(
        this.participants.reduce((a, { menuId }) => {
          let key = menuId;
          a[key] = a[key] || { menuId, count: 0 };
          a[key].count++;
          return a;
        }, {})
      );
      for (let i = 0; i < menuCount.length; i++) {
        /*
        let payload = {
          reservations: menuCount[i].count,
          menuId: menuCount[i].menuId,
        };
        */
        let payload = {
          reservations: menuCount[i].count,
          menuId: menuCount[i].menuId,
        };

        await this.$store.dispatch("decrementMenuOpenReservations", payload);
       
      }

      for (let i = 0; i < this.participants.length; i++) {
        for (let j = 0; j < this.participants[i].dishesIds.length; j++) {
          let dish = this.participants[i].dishesIds[j];
          let dishQuantity = 1;
          let payload = {
            dishQuantity: dishQuantity,
            menuId: this.participants[i].menuId,
            dishId: dish,
          };

          await this.$store.dispatch("decrementMenuDishQuantity", payload);
        }
      }
       this.clearData()
    },

    dishQuantityController(menuId,dishId){
      let participant = this.participants.filter(
        participant => participant.menuId == menuId
      )
      let dishCount=0;

      for(let i=0; i<participant.length;i++){
        for(let j=0; j< participant[i].dishesIds.length;j++){
          if(participant[i].dishesIds[j] == dishId){
            dishCount++;
          }
        }
      }

      return dishCount
    },

    menuQuantityController(menuId){
      let participant = this.participants.filter(
        participant => participant.menuId == menuId
      )
      return participant.length
    },
    areDishesPicked(){
      for(let i=0; i<this.participants.length;i++){
        for(let j=0; j< this.participants[i].dishesIds.length;j++){
          if(this.participants[i].dishesIds[j] == null){
            return false
          }
        }
      }
      return true
    }
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
    getMenuById() {
      return this.$store.getters.getMenuById;
    },
    getMenusByDate() {
      const menus = this.$store.getters.getAllMenus;
      var menuByDate = menus.filter(
        (menu) =>
          menu.startDate.slice(0, 10) === this.date && menu.openReservations > 0
      );
      return menuByDate;
    },
    getAllDishes() {
      return this.$store.getters.getAllDishes;
    },
    getNextReservation() {
      console.log("NEXT RESERVATION");
      console.log(this.$store.getters.getNextReservation);
      return this.$store.getters.getNextReservation;
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>
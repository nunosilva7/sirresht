<template>
  <div class="home">
    <div>
      <br>
      <div id="carousel" style="margin-left:10%;margin-right:10%;width:80%;height:100%;font-size:10px">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="200px"
          img-height="200px"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            caption="SIRRESHT"
            text="Regista-te e reserva a tua refeição"
            img-src="https://picsum.photos/1024/480/?image=52"
            
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54"
           text="20% desconto para a comunindade IPP"
          
          >
           
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=58"
          ></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
         
        </b-carousel>

        
      </div>
      <br>

      <b-container>
        <div style="text-align: center"><h1 id="homeMenu" >Menu em Destaque</h1></div>

        <b-card-group id="menuCard" class="justify-content-md-center">
          <NextMenuCard :key="getNextMenu.id" :nextMenu="getNextMenu" />
        </b-card-group>
      </b-container>
    </div>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import NextMenuCard from "../components/NextMenuCard.vue";

export default {
  name: "Home",
  components: {
    NextMenuCard,
  },
  data() {
    return {
      menu: {},
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  computed: {
    getNextMenu() {
      return this.$store.getters.getNextMenu;
    },
  },
};
</script>

<style src="../assets/customStyle.css">
</style>

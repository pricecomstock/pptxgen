<template>
  <div class="home">
    <button class="button is-primary" @click="fullScreenElementWithId('presentation-window')">Fullscreen</button>
    <button class="button is-danger" @click="loadSlides()">Load Slides</button>
    <hr>
    <div class="section columns is-centered">
      <presentation id="presentation-window" :slideshow="slides"></presentation>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Presentation from "@/components/Presentation.vue";
import axios from "@/axios-backend";

export default {
  name: "home",
  data() {
    return {
      slides: [
        {
          type: "Title",
          options: {
            title: "No slideshow loaded",
            subtitle: "...yet"
          }
        }
      ]
    };
  },
  components: {
    HelloWorld,
    Presentation
  },
  methods: {
    fullScreenElementWithId(id) {
      var elem = document.getElementById(id);
      elem.focus();
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    loadSlides() {
      axios.get("/slides").then(res => {
        console.log(res.data);
        this.slides = res.data.slides;
      });
    }
  }
};
</script>

<style lang="scss">
:fullscreen {
  width: 100%;
  height: 100%;
}
</style>

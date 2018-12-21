<template>
  <div class="home">
    <button class="button is-primary" @click="fullScreenElementWithId('presentation-window')">Fullscreen</button>
    <hr>
    <div class="section columns is-centered">
      <presentation id="presentation-window"></presentation>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Presentation from "@/components/Presentation.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    HelloWorld,
    Presentation
  },
  methods: {
    fullScreenElementWithId(id) {
      var elem = document.getElementById(id)
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  }
  // mounted() {
  //   axios.get("http://google.com");
  // }
};
</script>

<style lang="scss">
:fullscreen {
  width: 100%;
  height: 100%;
}
</style>


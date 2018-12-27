<template>
  <div class="home">
    <div class="columns is-centered">
      <div class="column is-one-third">
        <div class="buttons has-addons is-centered">
          <a class="button is-success is-large is-rounded" @click="loadSlides()" :class="{'is-loading':slideshowLoading}">
            <span class="icon is-medium">
              <i class="fas fa-comment-alt"></i>
            </span>
            <span>Present Now!</span>
          </a>
          <a class="button is-outlined is-large is-rounded" @click="customize=!customize">
            <span class="icon is-large">
              <i class="fas fa-cog fa-lg"></i>
            </span>
          </a>
        </div>
        <div class="box" v-if="customize">
          <div class="field">
            <div class="control">
              <label class="label is-large">I am</label>
              <input type="text" v-model="presenter" class="input is-large" placeholder="An Expert">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label is-large">And I need slides on</label>
              <input type="text" v-model="topic" class="input is-large" placeholder="A Topic">
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="slideshowLoaded">
      <button class="button is-outlined is-primary" @click="fullScreenPresentation()">
        <span class="icon is-medium">
          <i class="fas fa-expand"></i>
        </span>
        <span>Fullscreen</span>
      </button>
      <div class="section columns is-centered">
        <presentation @fullscreen="fullScreenPresentation()" id="presentation-window" :slideshow="slides"></presentation>
      </div>
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
      ],
      presenter: '',
      topic: '',
      slideshowLoaded: false,
      slideshowLoading: false,
      customize: false
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
    fullScreenPresentation() {
      this.fullScreenElementWithId('presentation-window');
    },
    loadSlides() {
      this.slideshowLoading = true;

      axios.get(`/slides?title=${this.topic}&subtitle=${"by " + this.presenter}`).then(res => {
        // console.log(res.data);
        this.slides = res.data.slides;
        this.slideshowLoaded = true;
        this.slideshowLoading = false;
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

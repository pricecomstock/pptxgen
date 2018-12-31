<template>
  <div class="home">
    <div class="columns is-centered">
      <div class="column is-one-third">
        <div class="buttons is-centered">
          <a class="button is-success is-large is-rounded" @click="loadSlides()" :class="{'is-loading':slideshowLoading}">
            <span class="icon is-medium">
              <i class="fas fa-comment-alt"></i>
            </span>
            <span>Present Now!</span>
          </a>
          <a class="button is-white is-large" @click="customize=!customize">
            <span class="icon is-large">
              <i class="fas fa-cog fa-lg"></i>
            </span>
          </a>
        </div>
        <div class="box" v-if="customize">
          <div class="field">
            <div class="control">
              <label class="label is-large">Presenter's Name</label>
              <input type="text" v-model="presenter" class="input is-large" placeholder="An Expert">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label is-large">Number of slides</label>
              <div class="buttons has-addons is-centered">
                <span
                  v-for="(option, index) in numSlidesOptions"
                  class="button"
                  :class="{'is-selected': numSlides === option, 'is-success': numSlides === option}"
                  @click="numSlides = option"
                  :key="index">{{ option }}</span>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label is-large">Other Options</label>
              <div class="buttons has-addons is-centered">
                <span
                  class="button"
                  :class="{'is-selected': numSlides === questionPrompt, 'is-info': questionPrompt}"
                  @click="questionPrompt = !questionPrompt">Questions</span>
                <!-- <span
                  class="button is-danger"
                  :class="{'is-selected': numSlides === nsfw, 'is-outlined': !nsfw}"
                  @click="nsfw = !nsfw">NSFW</span> -->
              </div>
            </div>
          </div>
          <!-- <div class="field">
            <div class="control">
              <label class="label is-large">And I need slides on</label>
              <input type="text" v-model="topic" class="input is-large" placeholder="A Topic">
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <hr v-if="slideshowLoaded">
    <div v-if="slideshowLoaded">
      <button class="button is-outlined is-primary" @click="fullScreenPresentation()">
        <span class="icon is-medium">
          <i class="fas fa-expand"></i>
        </span>
        <span>Fullscreen</span>
      </button>
      <div class="section columns is-centered">
        <presentation @fullscreen="fullScreenPresentation()" id="presentation-window" :slideshow="slides" :theme="theme"></presentation>
      </div>
      <!-- <button class="button is-info is-outlined" @click="exportSlide()">Export Slide as Image</button>
      <a :href="downloadableImage" v-if="downloadableImage != ''" class="button is-success" @click="exportSlide()">
        <span class="icon is-medium">
          <i class="fas fa-download"></i>
        </span>
        <span>Download</span>
      </a> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Presentation from "@/components/Presentation.vue";
import axios from "@/axios-backend";
// import html2canvas from 'html2canvas';

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
      presenter: "",
      numSlidesOptions: [6, 8, 10, 12, 14],
      numSlides: 10,
      topic: "",
      slideshowLoaded: false,
      slideshowLoading: false,
      customize: false,
      questionPrompt: false,
      nsfw: false,
      theme: {},
      imageReadyToDownload: false,
      downloadableImage: ''
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
      this.fullScreenElementWithId("presentation-window");
    },
    loadSlides() {
      this.slideshowLoading = true;

      axios
        .get(
          `/slides?presenter=${this.presenter}&count=${
            this.numSlides
          }&questions=${this.questionPrompt}`
        )
        .then(res => {
          // console.log(res.data);
          this.slides = res.data.slides;
          this.theme = res.data.theme;
          this.slideshowLoaded = true;
          this.slideshowLoading = false;
        });
    },
    // exportSlide() {
    //   html2canvas(document.querySelector('#presentation-window'))
    //     .then( (canvas) => {
    //       this.downloadableImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    //     })
    // }
  }
};
</script>

<style lang="scss">
:fullscreen {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home">
    <div class="columns is-centered">
      <div class="column is-one-third">
        <div class="box">
          <div class="field">
            <div class="control">
              <label class="label is-large">Presenter's Name</label>
              <input type="text" v-model="presenter" class="input is-medium" placeholder="An Expert">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label is-large">Number of slides</label>
              <div class="buttons has-addons is-centered are-medium">
                <span
                  v-for="(option, index) in numSlidesOptions"
                  class="button"
                  :class="{'is-selected': numSlides === option, 'is-info': numSlides === option}"
                  @click="numSlides = option"
                  :key="index">{{ option }}</span>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label is-large">Other Options</label>
              <div class="field">
                <input id="questionsinput" v-model="questionPrompt" type="checkbox" class="switch is-outlined is-rounded is-info">
                <label for="questionsinput">Prompt for Questions</label>
              </div>
              <!-- <div class="field">
                <input id="nsfwinput" v-model="nsfw" type="checkbox" class="switch is-outlined is-rounded is-danger">
                <label for="nsfwinput">Allow NSFW Content</label>
              </div> -->
            </div>
          </div>
          <!-- <div class="field">
            <div class="control">
              <label class="label is-medium">And I need slides on</label>
              <input type="text" v-model="topic" class="input is-medium" placeholder="A Topic">
            </div>
          </div> -->
        </div>
        <div class="buttons is-centered">
          <a class="button is-info is-large" @click="loadSlides()" :class="{'is-loading':slideshowLoading}">
            <span class="icon is-medium">
              <i class="fas fa-comment-alt"></i>
            </span>
            <span>Present Now!</span>
          </a>
        </div>
      </div>
    </div>
    <chart chartkey="asdfs"></chart>
    <hr v-if="slideshowLoaded">
    <div v-if="slideshowLoaded">
      <button class="button is-outlined is-primary" @click="fullScreenPresentation()">
        <span class="icon is-medium">
          <i class="fas fa-expand"></i>
        </span>
        <span>Fullscreen (recommended)</span>
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
import Presentation from "@/components/Presentation.vue";
import axios from "@/axios-backend";
import Chart from "@/components/slide-components/Chart.vue";
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
      numSlidesOptions: [6, 8, 10],
      numSlides: 8,
      topic: "",
      slideshowLoaded: false,
      slideshowLoading: false,
      questionPrompt: false,
      nsfw: false,
      theme: {},
      imageReadyToDownload: false,
      downloadableImage: ""
    };
  },
  components: {
    Presentation,
    Chart
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
    }
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

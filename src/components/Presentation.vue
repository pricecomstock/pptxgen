<template>
  <div
    tabindex="0"
    class="presentation"
    :style="themeStyles"
    @keyup.left="previousSlide()"
    @keyup.right="nextSlide()"
    @keypress.enter="nextSlide()">
    <div
      class="tag slide-counter"
      :class="{'is-dark': currentSlideIndex != (this.slideshow.length - 1), 'is-danger': currentSlideIndex === (this.slideshow.length - 1)}"
      v-if="currentSlideIndex !== 0"
      >{{currentSlideIndex + 1}}/{{this.slideshow.length}}</div>
    <div @click="previousSlide()" v-if="isMobile" class="slide-mover left">
      <span class="icon is-large">
        <i class="fas fa-2x fa-arrow-left"></i>
      </span>
    </div>
    <div @click="nextSlide()" v-if="isMobile" class="slide-mover right">
      <span class="icon is-large">
        <i class="fas fa-2x fa-arrow-right"></i>
      </span>
    </div>
    <keep-alive>
      <component 
      id="current-slide"
      :slide-options="currentSlide.options"
      :is="currentSlideComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import Title from "@/components/slides/Title.vue";
import Bullets from "@/components/slides/Bullets.vue";
import HalfImageTitle from "@/components/slides/HalfImageTitle.vue";
import HalfImageBullets from "@/components/slides/HalfImageBullets.vue";
import WebFontLoader from 'webfontloader';

export default {
  props: {
    slideshow: {
      type: Array,
      required: true
    },
    theme: {
      type: Object,
      required: false,
      default() {
        return {
          colors: ["#222", "#225"],
          gradientType: "linear-gradient",
          gradientDirection: "0deg",
          texture: 0,
          font: "Aleo"
        };
      }
    }
  },
  data() {
    return {
      currentSlideIndex: 0,
      preloadedImages: [],
      baseUrl: process.env.BASE_URL,
      isMobile: false
    };
  },
  components: {
    Title,
    Bullets,
    HalfImageTitle,
    HalfImageBullets
  },
  computed: {
    currentSlide() {
      return this.slideshow[this.currentSlideIndex];
    },
    currentSlideComponent() {
      return this.currentSlide.type;
    },
    themeStyles() {
      return {
        "background-image": `url("/textures/${
          this.theme.texture
        }.png"), ${this.theme.gradientType}(${
          this.theme.gradientDirection == "" ? "" : this.theme.gradientDirection + ", "
        }${
          this.theme.colors.join(", ")
        })`,
        "font-family": `"${this.theme.font}", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`
      };
    }
  },
  watch: {
    slideshow() {
      this.newSlideshow();
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex < this.slideshow.length - 1) {
        this.currentSlideIndex += 1;
        // console.log("Next Slide!");
      } else {
        // console.log("Already at end of slideshow!");
      }
    },
    isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },
    previousSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
        // console.log("Previous Slide!");
      } else {
        // console.log("Already at start of slideshow!");
      }
    },
    newSlideshow() {
      this.currentSlideIndex = 0;
      this.loadFonts();
      this.clearLoadedImages();
      this.preloadImages();
    },
    loadFonts() {
      if (this.theme.font) {
        WebFontLoader.load({
          google: {
            families: [this.theme.font]
          }
        });
      }
    },
    clearLoadedImages() {
      this.preloadedImages = [];
    },
    preloadImages() {
      this.slideshow.forEach(slide => {
        if (slide.options.imageUrl) {
          this.loadImageFromUrl(slide.options.imageUrl);
        }

        if (slide.options.contentImages) {
          slide.options.contentImages.forEach(cImg => {
            this.loadImageFromUrl(cImg.url);
          });
        }
      });
    },
    loadImageFromUrl(url) {
      let img = new Image();
      img.src = url;
      this.preloadedImages.push(img);
    },
    fullscreen() {
      this.$emit("fullscreen");
    }
  },
  mounted() {
    this.isMobile = this.isMobileDevice()
    this.newSlideshow();
  }
  // ready() {
  //   // var el = this.$el;
  //   // el.addEventListener('keyup', event => {
  //   //   if (event.keyCode === 40 || event.keyCode === 39) { // down arrow, right arrow
  //   //     this.nextSlide();
  //   //   } else if (event.keyCode === 37 || event.keyCode === 38 ) { // up arrow, back arrow
  //   //     this.previousSlide();
  //   //   }
  //   // })
  // }
};
</script>

<style lang="scss">
.presentation {
  color: #eee;
  height: 45vw;
  width: 80vw;
  position: relative;
  overflow: hidden;
  // background-color: #8a0027;
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */

  .pres-title {
    font-size: 5vw;
  }

  .pres-body {
    font-size: 3vw;
  }

  .slide-title {
    padding-left: 4vw;
    // margin-top: 4vh;
    padding-top: 4vh;
    margin-bottom: 2vh;
  }

  .slide-counter {
    font-family: "Rubik", sans-serif;
    font-size: 1.5em;
    border-radius: 0 0 0 1vw;
    min-width: 8%;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 5;
  }

  .slide-mover {
    position: absolute;
    bottom: 0px;
    min-width: 14%;
    font-size: 1.4vw;
    padding-top: 1.6%;
    padding-bottom: 0.8%;
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.55);
    cursor: pointer;
    z-index: 5;
  }
  
  .right {
    right: 0px;
    border-radius: 1vw 0 0 0;
  }
  
  .left {
    left: 0px;
    border-radius: 0 1vw 0 0;
  }
}

.slide {
  height: 100%;
}

.presentation:focus {
  outline: none;
}

.center-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.fill-img-container {
  // display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.fill-img-container img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.has-bg-img {
  // background: url('/assets/otie.jpg')center center;
  // background-size:cover;
  background-image: url("https://i.redd.it/nvlfhjq6gz521.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  // background-attachment: fixed;
  // filter: brightness(50%);
  // opacity: 0.5;
  background-size: cover;
  background-color: #000;
}

.has-bg-img p {
  color: white;
  z-index: 1;
  position: relative;
}

.darken-pseudo {
  position: relative;
}

.darken-pseudo:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: rgba(0, 0, 0, 0.55);
}

.slide img {
  z-index: 1;
}

.slide * {
  position: relative;
  z-index: 2;
}
</style>

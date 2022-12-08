<template>
  <div
    tabindex="0"
    class="presentation"
    :style="themeStyles"
    @keyup.left="previousSlide()"
    @keyup.right="nextSlide()"
    @keyup.up="previousSlide()"
    @keyup.down="nextSlide()"
    @keypress.enter="nextSlide()"
  >
    <div
      class="tag slide-counter"
      :class="{
        'is-dark': currentSlideIndex != this.slideshow.length - 2,
        'is-danger': currentSlideIndex === this.slideshow.length - 2,
      }"
      v-if="
        currentSlideIndex !== 0 &&
        currentSlideIndex !== this.slideshow.length - 1
      "
    >
      {{ currentSlideIndex }}/{{ this.slideshow.length - 2 }}
    </div>
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
        :slide-number="currentSlideIndex"
        :is="currentSlideComponent"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import Title from "@/components/slides/Title.vue";
import Bullets from "@/components/slides/Bullets.vue";
import HalfImageTitle from "@/components/slides/HalfImageTitle.vue";
import HalfImageBullets from "@/components/slides/HalfImageBullets.vue";
import WebFontLoader from "webfontloader";

export default {
  props: {
    slideshow: {
      type: Array,
      required: true,
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
          font: "Aleo",
        };
      },
    },
  },
  data() {
    return {
      currentSlideIndex: 0,
      preloadedImages: [],
      baseUrl: process.env.BASE_URL,
      isMobile: false,
    };
  },
  components: {
    Title,
    Bullets,
    HalfImageTitle,
    HalfImageBullets,
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
        "background-image": `url("/textures/${this.theme.texture}.png"), ${
          this.theme.gradientType
        }(${
          this.theme.gradientDirection == ""
            ? ""
            : this.theme.gradientDirection + ", "
        }${this.theme.colors.join(", ")})`,
        "font-family": `"${this.theme.font}", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif`,
      };
    },
  },
  watch: {
    slideshow() {
      this.newSlideshow();
    },
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex < this.slideshow.length - 1) {
        this.currentSlideIndex += 1;
      }
    },
    isMobileDevice() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    },
    previousSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
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
            families: [this.theme.font],
          },
        });
      }
    },
    clearLoadedImages() {
      this.preloadedImages = [];
    },
    preloadImages() {
      this.slideshow.forEach((slide) => {
        if (slide.options.imageUrl) {
          this.loadImageFromUrl(slide.options.imageUrl);
        }

        if (slide.options.contentImages) {
          slide.options.contentImages.forEach((cImg) => {
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
    },
  },
  mounted() {
    this.isMobile = this.isMobileDevice();
    this.newSlideshow();
  },
};
</script>

<style lang="scss">
.presentation {
  color: #eee;
  height: 45vw;
  width: 80vw;
  overflow: hidden;
  position: relative;

  // Everything inside the presentation can use em units to scale relative to this font size
  font-size: max(6vmin, 1rem);

  .slide-counter {
    font-family: "Open Sans", sans-serif;
    font-size: 0.4em;
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

.grid-slide {
  display: grid;
  grid-template-columns: [h-begin content-begin] 24fr [content-end visual-begin] 16fr [image-end h-end];
  grid-template-rows: [v-begin title-begin] 1fr [title-end body-begin] 10fr [body-end v-end];
  // justify-items: stretch;
  align-items: start;
  gap: 0.5vw;
  height: 100%;
  max-height: 100%;
  padding: 2% 1% 1% 1%;

  .slide-title {
    // margin-top: 10%;
    padding-left: 2%;
    grid-row: title-begin / title-end;
    grid-column: content-begin / image-end;
    justify-self: start;
    align-self: end;
    text-align: left;
  }

  .slide-content {
    text-align: left;
    grid-column: content-begin / content-end;
    grid-row: body-begin / body-end;
    align-self: start;
    padding-left: 5%;
  }

  .slide-content-no-visual {
    text-align: left;
    grid-column: h-begin / h-end;
    grid-row: body-begin / body-end;
    align-self: start;
  }

  .slide-image {
    grid-row: body-begin/v-end;
    grid-column: visual-begin / visual-end;
    width: 100%;
    max-height: 100%;
    height: auto;
  }
  .slide-chart {
    grid-row: body-begin/v-end;
    grid-column: visual-begin / visual-end;
  }
}

// By using em these will scale relative to general slide font size which is
// determined in top level presentation
.pres-title {
  font-size: 1.5em;
}

.pres-body {
  font-size: 1em;
}

.slide-title {
  font-size: 1.5em;
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

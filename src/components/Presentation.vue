<template>
  <div
    tabindex="0"
    class="presentation"
    @keyup.left="previousSlide()"
    @keyup.right="nextSlide()"
    @keypress.enter="nextSlide()">
    <div class="tag is-dark slide-counter">{{currentSlideIndex + 1}}/{{this.slideshow.length}}</div>
    <keep-alive>
      <component 
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
import testSlides from "@/testSlides.js";
export default {
  props: {
    slideshow: {
      type: Array,
      default() {
        return testSlides;
      }
    }
  },
  data() {
    return {
      currentSlideIndex: 0
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
    previousSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
        // console.log("Previous Slide!");
      } else {
        // console.log("Already at start of slideshow!");
      }
    }
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
  background-color: black;
  color: #eee;
  height: 45vw;
  width: 80vw;
  position: relative;
  overflow: hidden;

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
    font-size: 1.4vw;
    border-radius: 0 0 0 1vw;
    min-width: 6vw;
    position: absolute;
    right: 0px;
    top: 0px;
    // z-index: 1;
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

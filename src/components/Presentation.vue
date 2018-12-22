<template>
  <div
    tabindex="0"
    class="presentation"
    @keyup.left="previousSlide()"
    @keyup.right="nextSlide()"
    @keypress.enter="nextSlide()">
    <div class="tag is-dark slide-counter">{{currentSlideIndex + 1}}/{{this.slideshow.length}}</div>
    <component 
    :slide-options="currentSlide.options"
    :is="currentSlideComponent"></component>
  </div>
</template>

<script>
import Title from "@/components/slides/Title.vue";
import Bullets from "@/components/slides/Bullets.vue";
import HalfImage from "@/components/slides/HalfImage.vue";
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
    HalfImage
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
    margin-left: 4vw;
    margin-top: 4vh;
  }

  .slide-counter {
    font-size: 1.4vw;
    border-radius: 0 0 0 1vw;
    min-width: 6vw;
    position: absolute;
    right: 0px;
    top: 0px;
  }
}

.presentation:focus {
  outline: none;
}

.fill-img-container {
  display: flex;
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
</style>

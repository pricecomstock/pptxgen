<template>
  <div
    class="presentation"
    @keyup.left="previousSlide()"
    @keyup.right="nextSlide()"
    @keypress.enter="nextSlide()"
    @click="nextSlide()">
    <component :is="currentSlideComponent"></component>
  </div>
</template>

<script>
import Title from "@/components/slides/Title.vue"
import Bullets from "@/components/slides/Bullets.vue"
export default {
  components: {
    Title,
    Bullets
  },
  computed: {
    currentSlideComponent() {
      return 'Title'
    }
  },
  methods: {
    nextSlide() {
      console.log("Next Slide!")
    },
    previousSlide() {
      console.log("Previous Slide!")
    }
  }
}
</script>

<style lang="scss">
.presentation {
  background-color: black;
  color: #eee;
  height: 45vw;
  width: 80vw;
  
  .pres-title {
    font-size: 5vw;
  }
  
  .pres-body {
    font-size: 2.5vw;
  }

  .slide-title {
    margin-left: 4vw;
    margin-top: 2vw;
  }
}
</style>


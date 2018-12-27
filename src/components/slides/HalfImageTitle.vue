<template>
  <div class="columns is-gapless center-parent">
    <div v-if="slideOptions.imageLeft" class="column is-half fill-img-container half-image-image-container">
      <img :src="slideOptions.imageUrl" alt="uh there should be an image here sorry">
    </div>
    <div class="column is-half half-image-text-container">
      <div class="container is-fluid center-parent">
        <p class="half-image-title">
          {{ slideOptions.title }}
        </p>
        <p class="pres-body">
          {{ slideOptions.subtitle }}
        </p>
      </div>
    </div>
    <div v-if="!slideOptions.imageLeft" class="column is-half fill-img-container half-image-image-container">
      <img :src="slideOptions.imageUrl" alt="uh there should be an image here sorry">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slideOptions: {
      type: Object,
      default() {
        return {
          title: "This is a title slide that's pretty long!",
          imageUrl: "assets/otie.jpg",
          imgLeft: false
        };
      }
    }
  }
};
</script>

<style lang="scss">
.half-image-title {
  width: 100%;
  font-size: 2vw;
  display: block;
}

.half-image-subtitle {
  width: 100%;
  font-size: 1.5vw;
  display: block;
}

.half-image-text-container {
  height: 100%;
}

.half-image-image-container {
  height: 100%;
}
</style>

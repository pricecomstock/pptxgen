<template>
  <div class="columns is-gapless">
    <div class="column is-half">
      <section class="hero is-success is-fullheight half-image-text-container">
        <div class="hero-body">
          <div class="container is-fluid">
            <h1 class="half-image-title">
              {{ slideOptions.title }}
            </h1>
            <!-- <h2 class="pres-body">
              {{ slideOptions.subtitle }}
            </h2> -->
          </div>
        </div>
      </section>
    </div>
    <div class="column is-half fill-img-container">
      <img src="@/assets/otie.jpg" alt="uh there should be an image here sorry">
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
          subtitle: "Here's a little more detail"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.half-image-title {
  width: 100%;
  font-size: 7vh;
}

.half-image-text-container {
  max-height: 100%;
}

.half-image-image-container {
}
</style>

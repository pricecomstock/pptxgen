<template>
  <section class="slide hero is-fullheight has-bg-img">
    <div class="hero-body">
      <div class="container is-fluid">
        <h1 class="pres-title title-title">
          {{ slideOptions.title }}
        </h1>
        <h2 class="pres-body">
          {{ slideOptions.subtitle }}
        </h2>
      </div>
    </div>
  </section>
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
  },
  computed: {
    slideStyle() {
      return "{background: url('@/assets/fog.jpg'); backgroundSize: cover;}";
    }
  }
};
</script>

<style lang="scss" scoped>
.title-title {
  width: 100%;
}

.has-bg-img {
  background: url('/assets/otie.jpg')center center;
  background-size:cover;
}
</style>

<template>
  <div class="slide center-parent has-bg-img darken-pseudo" :style="[backgroundStyles]">
    <div class="title-body">
      <div class="container is-fluid">
        <p class="pres-title title-title">
          {{ slideOptions.title }}
        </p>
        <p class="pres-body">
          {{ slideOptions.subtitle }}
        </p>
      </div>
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
  },
  computed: {
    backgroundStyles() {
      return {
        "background-image": `url("${this.slideOptions.image}")`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.title-title {
  width: 100%;
}
</style>

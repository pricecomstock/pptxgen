<template>
  <section class="slide hero is-dark is-fullheight">
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
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-title {
  width: 100%
}
</style>

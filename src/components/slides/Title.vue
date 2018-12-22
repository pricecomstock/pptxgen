<template>
  <section class="slide hero is-fullheight has-bg-img darken-pseudo">
    <div class="hero-body title-body">
      <div class="container is-fluid">
        <p class="pres-title title-title">
          {{ slideOptions.title }}
        </p>
        <p class="pres-body">
          {{ slideOptions.subtitle }}
        </p>
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

.title-body {
  
}

.has-bg-img {
  // background: url('/assets/otie.jpg')center center;
  // background-size:cover;
  background-image: url("https://i.imgur.com/o1TOin9.jpg");
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
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

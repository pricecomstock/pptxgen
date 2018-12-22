<template>
  <section class="content is-large has-text-left">
    <div class="pres-title slide-title">
      {{slideOptions.title}}
    </div>
    <ul class="bullet-bullets pres-body">
      <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
        {{ bullet }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    slideOptions: {
      type: Object,
      default() {
        return {
          title: "Some Great Points",
          bullets: ["Here is the first bullet", "Bullet #2", "Item C"]
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bullet-bullets {
  margin-left: 8vw;
}
</style>

<template>
  <div class="is-large has-text-left">
    <div class="pres-title slide-title">
      {{slideOptions.title}}
    </div>
    <ul v-if="!slideOptions.ordered && !slideOptions.plaintext" class="bullet-bullets pres-body">
      <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
        {{ bullet }}
      </li>
    </ul>
    <ol v-if="slideOptions.ordered" class="bullet-numbers pres-body">
      <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
        {{ bullet }}
      </li>
    </ol>
    <ul v-if="slideOptions.plaintext" class="bullet-plain pres-body">
      <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
        {{ bullet }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slideOptions: {
      type: Object,
      default() {
        return {
          title: "Some Great Points",
          bullets: ["Here is the first bullet", "Bullet #2", "Item C"],
          ordered: false,
          plaintext: false
        };
      }
    }
  }
};
</script>

<style lang="scss">
.bullet-bullets {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 0;
  list-style: disc;

  li {
    margin-bottom: 0.3em;
  }
}

.bullet-numbers {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 0;

  li {
    margin-bottom: 0.3em;
  }
}

.bullet-plain {
  margin-left: 6%;
  margin-right: 6%;

  li {
    margin-bottom: 0.3em;
  }
}

</style>

<template>
  <div class="columns is-gapless center-parent">
    <div v-if="slideOptions.imageLeft" class="column is-half has-bg-img center-parent darken-pseudo" :style="[backgroundStyles]">
      <div class="container is-fluid center-parent">
        <p class="half-image-title" :style="titleStyles">
          {{ slideOptions.title }}
        </p>
        <p class="pres-body">
          {{ slideOptions.subtitle }}
        </p>
      </div>
    </div>
    <div class="column is-half pres-body">
      <ul v-if="!slideOptions.ordered" class="has-text-left" :class="listClasses" :style="bulletStyles">
        <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
          {{ bullet }}
        </li>
      </ul>
      <ol v-else class="has-text-left" :class="listClasses">
        <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
          {{ bullet }}
        </li>
      </ol>
    </div>
    <div v-if="!slideOptions.imageLeft" class="column is-half has-bg-img center-parent darken-pseudo" :style="[backgroundStyles]">
      <div class="container is-fluid center-parent">
        <div>
          <p class="half-image-title" :style="titleStyles">
            {{ slideOptions.title }}
          </p>
          <p class="half-image-subtitle">
            {{ slideOptions.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from "../mixins/backgroundImage";
import scale from "../mixins/scale";
export default {
  props: {
    slideOptions: {
      type: Object,
      default() {
        return {
          title: "This is a title slide that's pretty long!",
          image: "assets/otie.jpg",
          imageLeft: true,
          plaintext: false,
          ordered: false
        };
      }
    }
  },
  computed: {
    listClasses() {
      return {
        "half-bullets":
          !this.slideOptions.plaintext && !this.slideOptions.ordered,
        "half-numbered": this.slideOptions.ordered,
        "half-plain": this.slideOptions.plaintext
      };
    },
    bulletStyles() {
      let fontSizeModifier = this.scale(this.bulletCharCount, 0, 250, 2, 1.05);
      return {
        "font-size": `${1 + fontSizeModifier}vw`
      };
    },
    titleStyles() {
      let fontSizeModifier = this.scale(
        this.slideOptions.title.length,
        0,
        50,
        0.5,
        0
      );
      return {
        "font-size": `${4 + fontSizeModifier}vw`
      };
    }
  },
  mixins: [backgroundImage, scale]
};
</script>

<style lang="scss" scoped>
.half-bullets {
  margin-left: 12%;
  margin-right: 12%;
  margin-top: 0;
  list-style: disc;

  li {
    margin-bottom: 0.3em;
  }
}
.half-numbered {
  margin-left: 14%;
  margin-right: 12%;
  margin-top: 0;
  // list-style: disc;

  li {
    margin-bottom: 0.3em;
  }
}
.half-plain {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 0;
  list-style: disc;

  li {
    margin-bottom: 0.3em;
  }
}
</style>

<template>
  <div class="slide">
    <div class="pres-title slide-title has-text-left" :style="titleStyles">
      {{slideOptions.title}}
    </div>
    <div class="has-text-left">
      <ul v-if="!slideOptions.ordered && !slideOptions.plaintext" class="bullet-bullets pres-body" :style="bulletStyles">
        <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
          {{ bullet }}
        </li>
      </ul>
      <ol v-if="slideOptions.ordered" class="bullet-numbers pres-body" :style="bulletStyles">
        <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
          {{ bullet }}
        </li>
      </ol>
      <ul v-if="slideOptions.plaintext" class="bullet-plain pres-body" :style="bulletStyles">
        <li v-for="(bullet, index) in slideOptions.bullets" :key="index">
          {{ bullet }}
        </li>
      </ul>
    </div>
    <img v-for="(image, index) in slideOptions.contentImages"
    :src="image.url"
    :style="imageStyles[index]"
    alt="Uh image"
    :key="index">
    <chart v-if="slideOptions.chart"
    :chart-key="`slide${slideNumber}`"
    :key="`slide${slideNumber}`"
    :chart-data="slideOptions.chart.data"
    :style="chartStyles"
    ></chart>
  </div>
</template>

<script>
import chart from "../slide-components/Chart.vue"
import scale from "../mixins/scale";
export default {
  props: {
    slideOptions: {
      type: Object,
      default() {
        return {
          title: "Some Great Points",
          bullets: ["Here is the first bullet", "Bullet #2", "Item C"],
          ordered: false,
          plaintext: false,
          images: [
            {
              url: "https://i.redd.it/8ewex5he4k0y.jpg",
              position: {
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
              },
              width: 100
            }
          ]
        };
      }
    },
    slideNumber: {
      type: Number,
      default: 0
    }
  },
  mixins: [scale],
  computed: {
    imageStyles() {
      return this.slideOptions.contentImages.map(img => {
        return {
          position: "absolute",
          top: img.position.top || null, // ? img.position.top : null,
          right: img.position.right || null, // hasOwnProperty("right") ? img.position.right : null,
          bottom: img.position.bottom || null, // hasOwnProperty("bottom") ? img.position.bottom : null,
          left: img.position.left || null, // hasOwnProperty("left") ? img.position.left : null,
          width: img.width || "auto",
          height: img.height || "auto",
          "max-height": img.maxHeight || "75%",
          "max-width": img.maxWidth || "50%"
        };
      });
    },
    chartStyles() {
      let chart = this.slideOptions.chart
      return {
        position: "absolute",
        top: chart.position.top || null,
        right: chart.position.right || null,
        bottom: chart.position.bottom || null,
        left: chart.position.left || null,
        width: chart.width || "auto",
        height: chart.height || "auto",
        "max-height": "75%",
        "max-width": "50%"
      }
    },
    bulletStyles() {
      let fontSizeModifier = this.scale(this.bulletCharCount, 0, 350, 2, 1.05);
      return {
        "font-size": `${3 + fontSizeModifier}vh`,
        "max-width": this.slideOptions.maxWidth
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
  components: {
    chart
  }
};
</script>

<style lang="scss">
.bullet-bullets {
  margin-left: 8%;
  margin-right: 8%;
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
  margin-right: 4%;

  li {
    margin-bottom: 0.3em;
  }
}
</style>

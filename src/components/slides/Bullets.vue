<template>
  <div class="slide">
    <div class="pres-title slide-title has-text-left">
      {{slideOptions.title}}
    </div>
    <div class="has-text-left">
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
    <img v-for="(image, index) in slideOptions.images"
    :src="image.url"
    :style="imageStyles[index]"
    alt="Uh image"
    :key="index">
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
          plaintext: false,
          images: [
            {
              // data: null, // TODO: This should maybe be URL,
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
    }
  },
  computed: {
    imageStyles() {
      return this.slideOptions.contentImages.map(img => {
        return {
          position: "absolute",
          top: img.position.top || null, // ? img.position.top : null,
          right: img.position.right || null, // hasOwnProperty("right") ? img.position.right : null,
          bottom: img.position.bottom || null, // hasOwnProperty("bottom") ? img.position.bottom : null,
          left: img.position.left || null, // hasOwnProperty("left") ? img.position.left : null,
          width: img.width || "30%",
          height: img.height || "auto"
        };
      });
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

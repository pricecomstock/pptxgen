<template>
  <div class="section pcfooter">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item has-text-grey">
            {{ footerText }}
          </div>
        </div>
        <div class="level-right is-size-7">
          <div class="level-item">
            <a
              class="button is-small is-light has-text-grey"
              href="https://blog.pricecomstock.com"
              >by Price Comstock</a
            >
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control" v-if="displaySocialLinks.twitter">
                <a
                  href="https://twitter.com/price_comstock"
                  class="button has-text-grey is-small is-light"
                >
                  <span class="icon is-medium">
                    <i class="fab fa-lg fa-twitter"></i>
                  </span>
                </a>
              </p>
              <p class="control" v-if="displaySocialLinks.resume">
                <a
                  href="https://pricecomstock.com"
                  class="button has-text-grey is-small is-light"
                >
                  <span class="icon is-medium">
                    <i class="fa fa-lg fa-user"></i>
                  </span>
                </a>
              </p>
              <p class="control" v-if="displaySocialLinks.blog">
                <a
                  href="https://blog.pricecomstock.com"
                  class="button has-text-grey is-small is-light"
                >
                  <span class="icon is-medium">
                    <i class="fa fa-lg fa-comment-dots"></i>
                  </span>
                </a>
              </p>
              <p class="control" v-if="displaySocialLinks.github">
                <a
                  :href="githubUrl"
                  class="button has-text-grey is-small is-light"
                >
                  <span class="icon is-medium">
                    <i class="fab fa-lg fa-github"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import details from "@/details.js";
export default {
  name: "Footer",
  data() {
    return {
      appName: details.appTitle,
      year: new Date().getFullYear(),
      displaySocialLinks: {
        twitter: true,
        resume: true,
        blog: false,
        github: true
      },
      githubUrl: details.githubUrl,
      version: details.appVersion
    };
  },
  computed: {
    footerText() {
      if (this.version) {
        return this.appName + " v" + this.version;
      } else {
        return this.appName + " ©" + this.year;
      }
    }
  }
};
</script>

<style>
body {
  min-height: 100%;
  position: relative;
  padding-bottom: 4rem;
}

@media only screen and (max-width: 760px) {
  body {
    padding-bottom: 10rem;
  }
}

html {
  height: 100%;
  box-sizing: border-box;
}

.section.pcfooter {
  background-color: hsl(0, 0%, 96%);
  padding: 1rem 0rem;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

@media only screen and (max-width: 767px) {
  .section.pcfooter {
    position: static;
  }
}
</style>

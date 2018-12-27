const backgroundImage = {
  computed: {
    backgroundStyles() {
      return {
        "background-image": `url("${this.slideOptions.imageUrl}")`
      };
    }
  }
}

export default backgroundImage
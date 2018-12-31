const scale = {
  methods: {
    scale(num, in_min, in_max, out_min, out_max) {
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    }
  },
  computed: {
    bulletCharCount() {
      return this.slideOptions.bullets.reduce((accumulator, currentValue) => {
        try {
          return accumulator + currentValue.length;
        } catch (err) {
          return accumulator;
        }
      }, 0);
    }
  }
};

export default scale;

<template>
  <div
    class="card"
    :class="classes"
    @click="moveCard">
    <span v-if="visible">{{ value }}{{ suit }}</span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: {
      type: String,
      default: 'A',
    },
    suit: {
      type: String,
      default: 'c',
    },
    order: {
      type: Number,
      default: 0,
    },
    position: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
      };
    },
  },
  methods: {
    moveCard() {
      const {
        order,
        suit,
        position,
        visible,
      } = this;
      // console.log('mc', order, suit, position);

      const card = {
        order,
        suit,
        position,
        visible,
      };

      this.$store.dispatch('moveCard', card);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$height: 6.25rem;
$font-size: 2rem;

.card {
  display: flex;
  flex: 1;
  justify-content: center;
  border: 1px solid black;
  background: grey;
  width: 100%;
  height: $height;
  border-radius: 5px;
  font-weight: 700;
  font-size: $font-size;

  &:nth-of-type(n+2) {
    margin-top: calc(-#{$height} + #{$font-size});
  }

  &--is-visible {
    background: white;
  }

  &--is-s {
    color: black;
  }

  &--is-d {
    color: blue;
  }

  &--is-h {
    color: red;
  }

  &--is-c {
    color: lightgreen;
  }
}
</style>

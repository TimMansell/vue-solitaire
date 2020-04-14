<template>
  <div
    class="card"
    :class="classes"
    @click.stop="moveCard"
    :data-test="`card-${value}${suit}`">
    <span v-if="visible">{{ value }}{{ visualSuit }}</span>
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
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      const { toMove } = this.$store.getters;

      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
        'card--is-selected': toMove && `${toMove.value}${toMove.suit}` === `${this.value}${this.suit}`,
        'card--is-not-clickable': !this.clickable,
      };
    },
    visualSuit() {
      const { suit } = this;

      if (suit === 'h') {
        return '♥';
      }

      if (suit === 'd') {
        return '♦';
      }

      if (suit === 'c') {
        return '♣';
      }

      if (suit === 's') {
        return '♠';
      }

      return '';
    },
  },
  methods: {
    moveCard() {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      const card = {
        value,
        order,
        suit,
        position,
        visible,
      };

      if (this.clickable) {
        this.$store.dispatch('moveCard', card);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$height: 3rem;
$font-size: 1rem;

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

  @media (min-width: 900px) {
    font-size: $font-size * 2;
    height: $height * 2;
   }

  &:nth-of-type(n+2) {
    margin-top: -60%;
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
    color: orange;
  }

  &--is-selected {
    box-shadow: inset 0 0 0 3px black;
  }

  &--is-not-clickable {
    pointer-events:none;
  }
}
</style>

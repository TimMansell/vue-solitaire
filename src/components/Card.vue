<template>
  <div
    class="card"
    :class="classes"
    @click.stop="moveCard"
    data-test="card">
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
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedCards: this.$store.getters.selectedCards,
    };
  },
  computed: {
    classes() {
      const { selectedCards } = this.$store.getters;

      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
        'card--is-selected': selectedCards.toMove !== null && `${selectedCards.toMove.value}${selectedCards.toMove.suit}` === `${this.value}${this.suit}`,
        'card--is-not-clickable': !this.clickable,
      };
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
      // console.log('mc', order, suit, position);

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
    color: lightgreen;
  }

  &--is-selected {
    box-shadow: inset 0 0 0 3px black;
  }

  &--is-not-clickable {
    pointer-events:none;
  }
}
</style>

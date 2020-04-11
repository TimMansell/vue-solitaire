<template>
  <div
    class="card"
    :class="{'card--is-visible': visible}"
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
.card {
  display: flex;
  flex: 1;
  justify-content: center;
  border: 1px solid black;
  background: grey;
  width: 100%;
  height: 100px;
  border-radius: 5px;

  &:nth-of-type(n+2) {
    margin-top: -50%;
  }

  &--is-visible {
    background: white;
  }
}
</style>

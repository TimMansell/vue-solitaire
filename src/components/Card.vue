<template>
  <div
    class="card"
    :class="{'card--is-visible': visible}">
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
    visible: {
      type: Boolean,
      default: false,
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

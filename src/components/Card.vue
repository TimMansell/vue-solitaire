<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: {
      type: String,
      default: 'Ac',
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
  background: white;
  width: 100%;
  height: 100px;
  border-radius: 5px;

  &:nth-of-type(n+2) {
    margin-top: -50%;
  }
}
</style>

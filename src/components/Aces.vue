<template>
  <div class="aces">
    <div
      class="ace"
      v-for="(ace, index) in aces"
      :key="index">
      A
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aces',
  data() {
    return {
      aces: 4,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aces {
  display: flex;
  padding: 1rem;
  height: 100px;
}
.ace {
  border: 1px solid white;
  // height: 100px;
  margin-right: 1rem;
  width: 100px;
}
</style>

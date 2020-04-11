<template>
  <div class="aces">
    <div
      class="ace"
      v-for="(ace, index) in aces"
      :key="index"
      @click="moveCardToAce">
      <span v-if="!ace">A</span>
      <CardAce
        v-for="(card, index2) in ace"
        :key="index2"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible" />
    </div>
  </div>
</template>

<script>
import CardAce from '@/components/CardAce.vue';

export default {
  name: 'Aces',
  components: {
    CardAce,
  },
  data() {
    return {
      aces: this.$store.getters.aces,
    };
  },
  methods: {
    moveCardToAce() {
      this.$store.dispatch('moveCardToAce');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aces {
  display: flex;
  padding: 1rem;
  // height: 100px;
}
.ace {
  border: 1px solid white;
  // height: 100px;
  margin-right: 1rem;
  width: 100px;
  padding: 1rem;
}
</style>

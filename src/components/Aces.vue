<template>
  <div class="aces">
    <div
      class="ace"
      v-for="(ace, index) in aces"
      :key="index"
      @click="moveCardToAce">
      <span v-if="!ace">A</span>
      <Card
        v-for="(card, index2) in ace"
        :key="index2"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Aces',
  components: {
    Card,
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
  margin-bottom: 1rem;
}

.ace {
  border: 1px solid white;
  margin-right: 1rem;
  width: 100px;
  padding: 1rem;
}
</style>

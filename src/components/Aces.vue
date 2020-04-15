<template>
  <div
    class="aces"
    @click="moveCardToFoundation"
    data-test="ace">
    <div
      class="ace"
      v-for="(ace, index) in aces"
      :key="index"
      :data-test="`ace-${index}`">
      <Card
        v-for="(card, index2) in ace"
        :key="index2"
        :value="card.value"
        :suit="card.suit"
        :order="card.order"
        :position="card.position"
        :visible="card.visible"
        :clickable="false" />

      <SvgIcon
        v-if="!ace.length"
        name="Card_back_17" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Aces',
  components: {
    Card,
    SvgIcon,
  },
  data() {
    return {
      aces: this.$store.getters.aces,
      placeholders: [
        'h',
        's',
        'c',
        'd',
      ],
    };
  },
  methods: {
    moveCardToFoundation() {
      this.$store.dispatch('moveCardToFoundation');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aces {
  display: flex;
  margin-bottom: 1rem;
  margin-left: -.5rem;
  margin-right: -.5rem;
}

.ace {
  opacity: .1;
  padding: .5rem;
}

.card {
  &:nth-of-type(n+2) {
    margin-top: -140px;
  }
}
</style>

<template>
  <div class="cloned-card" :style="clonedCardStyles">
    <Card
      v-for="(card, index) in clonedCards.cards"
      :key="index"
      :id="card.id"
      :value="card.value"
      :suit="card.suit"
      :revealed="card.revealed"
      :visible="card.visible"
      :clickable="false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { throttle } from 'throttle-debounce';
import Card from '@/components/Card.vue';

export default {
  name: 'DraggedCards',
  components: {
    Card,
  },
  data() {
    return {
      clonedCardStyles: {},
    };
  },
  computed: {
    ...mapGetters(['clonedCards']),
    cardOffset() {
      const { cardWidth } = this.clonedCards;

      return cardWidth / 2;
    },
  },
  mounted() {
    window.addEventListener('dragover', throttle(60, false, this.setStyles));
    window.addEventListener('dragend', this.clearCloneCards);
  },
  destroyed() {
    window.removeEventListener('dragover', this.setStyles);
    window.removeEventListener('dragend', this.clearCloneCards);
  },
  methods: {
    ...mapActions(['clearCloneCards']),
    setStyles(e) {
      // console.log({ e });
      const { x, y } = e;
      const { cardOffset } = this;

      this.clonedCardStyles = {
        top: `${y}px`,
        left: `${x - cardOffset}px`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.cloned-card {
  position: absolute;
  width: 150px;
}
</style>

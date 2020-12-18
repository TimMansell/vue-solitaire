<template>
  <div class="cloned-card" :style="clonedCardStyles">
    <Card
      v-for="(card, index) in clonedCards.cards"
      id="xxx"
      :key="index"
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
import { throttle, debounce } from 'throttle-debounce';
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

      if (!cardWidth) {
        return 0;
      }

      return cardWidth / 2;
    },
  },
  mounted() {
    window.addEventListener('mousemove', debounce(0, false, this.setStyles));
    window.addEventListener('dragover', throttle(30, false, this.setStyles));
    window.addEventListener('dragend', this.clearCloneCards);
  },
  destroyed() {
    window.removeEventListener('mousemove', this.setStyles);
    window.removeEventListener('dragover', this.setStyles);
    window.removeEventListener('dragend', this.clearCloneCards);
  },
  methods: {
    ...mapActions(['clearCloneCards']),
    setStyles(event) {
      const { x, y } = event;
      const {
        cardOffset,
        clonedCards: { cardWidth },
      } = this;

      this.clonedCardStyles = {
        top: `${y - 20}px`,
        left: `${x - cardOffset}px`,
        width: `${cardWidth}px`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.cloned-card {
  position: absolute;
  pointer-events: none;
}
</style>

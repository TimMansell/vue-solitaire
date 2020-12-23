<template>
  <div class="dragged-cards" :style="containerStyles">
    <div :style="cardStyles">
      <Card
        v-for="(card, index) in draggedCards"
        id="xxx"
        :key="index"
        :value="card.value"
        :suit="card.suit"
        :revealed="card.revealed"
        :visible="card.visible"
        :clickable="false"
      />
    </div>
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
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      yOffset: 20,
    };
  },
  computed: {
    ...mapGetters(['draggedCards']),
    cardOffset() {
      const { width } = this;

      if (!width) {
        return 0;
      }

      return width / 2;
    },
    cardStyles() {
      const { width } = this;

      return {
        width: `${width}px`,
      };
    },
    containerStyles() {
      const { x, y, yOffset, cardOffset } = this;

      return {
        top: `${y - yOffset}px`,
        left: `${x - cardOffset}px`,
      };
    },
  },
  mounted() {
    window.addEventListener(
      'mousemove',
      debounce(0, false, this.setCardPosition)
    );
    window.addEventListener(
      'dragover',
      throttle(10, false, this.setCardPosition)
    );
    window.addEventListener('drop', this.clearDraggedCards);
  },
  destroyed() {
    window.removeEventListener('mousemove', this.setCardPosition);
    window.removeEventListener('dragover', this.setCardPosition);
    window.removeEventListener('drop', this.clearDraggedCards);
  },
  methods: {
    ...mapActions(['clearDraggedCards']),
    setCardPosition({ x, y }) {
      this.x = x;
      this.y = y;
    },
  },
};
</script>

<style scoped lang="scss">
.dragged-cards {
  position: absolute;
  pointer-events: none;
}
</style>

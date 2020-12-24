<template>
  <div
    class="dragged-cards"
    :style="containerStyles"
    data-test="dragged-cards-container"
  >
    <div :style="cardStyles" data-test="dragged-cards">
      <Card
        v-for="(card, index) in draggedCards"
        :id="`dragged-${index}`"
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
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
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
    };
  },
  computed: {
    ...mapGetters(['draggedCards']),
    cardOffset() {
      const { width } = this;

      return width / 2;
    },
    cardStyles() {
      const { width } = this;

      return {
        width: `${width}px`,
      };
    },
    cardPosition() {
      const { x, y, cardOffset } = this;

      const topOffset = y;
      const leftOffset = x - cardOffset;

      return {
        topOffset,
        leftOffset,
      };
    },
    containerStyles() {
      const {
        cardPosition: { topOffset, leftOffset },
      } = this;

      return {
        top: `${topOffset}px`,
        left: `${leftOffset}px`,
      };
    },
  },
  mounted() {
    const events = {
      mousemove: debounce(0, false, this.setCardPosition),
      dragover: throttle(10, false, this.setCardPosition),
      drop: this.clearDraggedCards,
      dragend: this.clearDraggedCards,
    };

    this.events = addEventListener(events);
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    ...mapActions(['clearDraggedCards']),
    setCardPosition({ clientX, clientY }) {
      this.x = clientX;
      this.y = clientY;
    },
  },
};
</script>

<style scoped lang="scss">
.dragged-cards {
  position: absolute;
  pointer-events: none;
  margin-top: calc(var(--vr) * -1);
}
</style>

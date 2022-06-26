<template>
  <div
    class="dragged-cards"
    :style="containerStyles"
    data-test="dragged-cards-container"
  >
    <div :style="cardStyles" data-test="dragged-cards">
      <Card
        v-for="({ value, suit, visible }, index) in draggedCards"
        :id="`dragged-${index}`"
        :key="index"
        :value="value"
        :suit="suit"
        :visible="visible"
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
      dragstart: this.setCardPosition,
      dragover: this.setCardPosition,
    };

    this.events = addEventListener(events);
  },
  unmounted() {
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
  margin-top: calc(var(--mg-md) * -1);
}
</style>

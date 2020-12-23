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
    const events = {
      mousemove: debounce(0, false, this.setCardPosition),
      dragover: throttle(10, false, this.setCardPosition),
      drop: this.clearDraggedCards,
    };

    this.events = addEventListener(events);
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
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

<template>
  <div
    class="card"
    :class="classes"
    @click.stop="moveCard"
    :data-test="`card-${value}${suit}`"
    @dragstart="dragCard"
    draggable>
    <SvgIcon
      v-if="visible"
      :name="`${this.value}${this.suit.toUpperCase()}`" />

    <SvgIcon
      v-if="!visible"
      name="Card_back_17" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Card',
  components: {
    SvgIcon,
  },
  props: {
    value: {
      type: String,
      default: 'A',
    },
    suit: {
      type: String,
      default: 'c',
    },
    order: {
      type: Number,
      default: 0,
    },
    position: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    revealed: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      const { toMove } = this.$store.getters;

      return {
        'card--is-visible': this.visible,
        'card--is-s': this.suit === 's',
        'card--is-d': this.suit === 'd',
        'card--is-h': this.suit === 'h',
        'card--is-c': this.suit === 'c',
        'card--is-selected': toMove && `${toMove.value}${toMove.suit}` === `${this.value}${this.suit}`,
        'card--is-not-clickable': !this.clickable,
      };
    },
  },
  methods: {
    moveCard() {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      const card = {
        value,
        order,
        suit,
        position,
        visible,
      };

      if (this.clickable && this.visible) {
        this.$store.dispatch('moveCard', card);
      }
    },
    dragCard(e) {
      const {
        value,
        order,
        suit,
        position,
        visible,
      } = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('value', value);
      e.dataTransfer.setData('order', order);
      e.dataTransfer.setData('suit', suit);
      e.dataTransfer.setData('position0', position[0]);
      e.dataTransfer.setData('position1', position[1]);
      e.dataTransfer.setData('visible', visible);
    },
    // dropCard(e) {
    //   const {
    //     value,
    //     order,
    //     suit,
    //     position,
    //     visible,
    //   } = this;

    //   const card = {
    //     value,
    //     order,
    //     suit,
    //     position,
    //     visible,
    //   };

    //   const valueDrag = e.dataTransfer.getData('value');
    //   const orderDrag = e.dataTransfer.getData('order');
    //   const suitDrag = e.dataTransfer.getData('suit');
    //   const positionDrag0 = e.dataTransfer.getData('position0');
    //   const positionDrag1 = e.dataTransfer.getData('position1');
    //   const visibleDrag = e.dataTransfer.getData('visible');

    //   const cardDrag = {
    //     value: valueDrag,
    //     order: parseInt(orderDrag, 10),
    //     suit: suitDrag,
    //     position: [positionDrag0, positionDrag1],
    //     visible: !!visibleDrag,
    //   };

    //   console.log('drag card', cardDrag);
    //   console.log('drag to card', card);

    //   this.$store.dispatch('moveCard', cardDrag);
    //   this.$store.dispatch('moveCard', card);
    // },
  },
};
</script>

<style scoped lang="scss">
.card {
  transition: all .05s ease-in-out;
  transform-style: preserve-3d;

  &:nth-of-type(n+2) {
    margin-top: -#{$card-height * $card-spacer};

    @media (min-width: $bp-sm) {
      margin-top: -#{$card-height-sm * $card-spacer};
    }

    @media (min-width: $bp-md) {
      margin-top: -#{$card-height-md * $card-spacer};
    }

    @media (min-width: $bp-lg) {
      margin-top: -#{$card-height-lg * $card-spacer};
    }

    @media (min-width: $bp-xl) {
      margin-top: -#{$card-height-xl * $card-spacer};
    }
  }

  &--is-s {
    &--color-blind {
      color: black;
    }
  }

  &--is-d {
    &--color-blind {
      color: blue;
    }
  }

  &--is-h {
    &--color-blind {
      color: red;
    }
  }

  &--is-c {
    &--color-blind {
      color: orange;
    }
  }

  &--is-selected {
    transform: scale(1.1);
  }

  &--is-not-clickable {
    pointer-events:none;
  }
}
</style>

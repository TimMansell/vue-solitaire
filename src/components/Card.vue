<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    :draggable="visible"
    ref="card"
    :data-test="cardTestName"
  >
    <DefaultCard :value="cardValue" v-show="visible && !bottomCard" />

    <BottomCard :id="id" :value="cardValue" v-show="visible && bottomCard" />

    <CardPlaceholder v-show="!visible" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DefaultCard from '@/components/DefaultCard.vue';
import BottomCard from '@/components/BottomCard.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

const checkSuit = (suit) => {
  if (suit === 'h') {
    return '♥';
  }

  if (suit === 'c') {
    return '♣';
  }

  if (suit === 's') {
    return '♠';
  }

  if (suit === 'd') {
    return '♦';
  }

  return suit;
};

export default {
  name: 'Card',
  components: {
    DefaultCard,
    BottomCard,
    CardPlaceholder,
  },
  props: {
    id: {
      type: [String, Number],
      default: 0,
    },
    value: {
      type: String,
      default: 'A',
    },
    suit: {
      type: String,
      default: '♣',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    revealed: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    bottomCard: {
      type: Boolean,
      default: false,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['selectedCardId']),
    cardValue() {
      const { value, suit } = this;

      const useSuit = checkSuit(suit);

      return `${value}${useSuit}`;
    },
    classes() {
      const { selectedCardId } = this;
      const { id, stacked, clickable, visible } = this;

      return {
        'card--is-selected': selectedCardId === id,
        'card--is-stacked': stacked,
        'card--is-not-clickable': !clickable,
        'card--is-draggable': visible,
      };
    },
    cardTestName() {
      const { value, suit, visible } = this;

      if (visible) {
        return `card-${value}${suit}`;
      }

      return 'card-hidden';
    },
  },
  methods: {
    ...mapActions(['setCard', 'setCloneCards']),
    selectCard(e, id) {
      const { selectedCardId } = this;

      if (!selectedCardId) {
        e.stopPropagation();

        if (this.clickable && this.visible) {
          this.setCard(id);
        }
      }
    },
    dragCard(e, id) {
      const cardWidth = this.$refs.card.clientWidth;

      this.setCloneCards({ id, cardWidth });
      this.setCard(id);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;

  &:nth-of-type(n + 2) {
    margin-top: -110%;
  }

  &::before {
    content: '';
    transition: all 0.1s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    @media (min-width: $bp-sm) {
      border-radius: var(--bdr-radius-sm);
    }

    @media (min-width: $bp-lg) {
      border-radius: var(--bdr-radius-lg);
    }
  }

  &--is-stacked {
    &:nth-of-type(n + 2) {
      margin-top: -140%;
    }
  }

  &--is-selected {
    &::before {
      background: var(--bg-tertiary);
      opacity: 0.3;
    }
  }

  &--is-not-clickable {
    pointer-events: none;
  }

  &--is-draggable {
    cursor: grab;
  }

  &--is-cloned {
    &::before {
      content: none;
    }
  }
}
</style>

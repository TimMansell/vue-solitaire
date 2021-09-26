<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    @dragend.prevent
    :draggable="visible"
    :data-test="cardTestName"
    :data-card-selected="cardIsSelected"
  >
    <DefaultCard :value="cardValue" v-if="visible && !bottomCard" />

    <BottomCard :id="id" :value="cardValue" v-if="visible && bottomCard" />

    <CardPlaceholder v-if="!visible" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DefaultCard from '@/components/DefaultCard.vue';
import BottomCard from '@/components/BottomCard.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

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
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    suit: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
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
    isDragged: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['selectedCardId', 'draggedCards', 'isCardDragged']),
    cardValue() {
      const { value, suit } = this;

      return `${value}${suit}`;
    },
    classes() {
      const { selectedCardId, id, stacked, clickable, visible, isDragged } =
        this;

      return {
        'card--is-selected': selectedCardId === id && !isDragged,
        'card--is-stacked': stacked,
        'card--is-not-clickable': !clickable,
        'card--is-draggable': visible,
        'card--is-dragged': isDragged,
      };
    },
    cardTestName() {
      const { value, suit, visible } = this;

      if (visible) {
        return `card-${value}${suit}`;
      }

      return 'card-hidden';
    },
    cardIsSelected() {
      const { selectedCardId, id, isDragged } = this;

      return selectedCardId === id && !isDragged;
    },
  },
  methods: {
    ...mapActions(['setCard', 'setDraggedCards']),
    selectCard(e, id) {
      const { selectedCardId } = this;

      if (!selectedCardId) {
        e.stopPropagation();

        if (this.clickable && this.visible) {
          this.setCard(id);
        }
      }
    },
    dragCard(event, id) {
      event.dataTransfer.setDragImage(new Image(), 0, 0);

      this.setDraggedCards(id);
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

  &--is-dragged {
    opacity: 0;
  }
}
</style>

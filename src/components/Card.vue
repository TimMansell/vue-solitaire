<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    @dragend="clearCard()"
    :draggable="visible"
    ref="card"
    :data-card-suit="cardSuitName"
    :data-test="cardTestName"
  >
    <DefaultCard
      :id="id"
      :value="value"
      :suit="suit"
      v-if="visible && !bottomCard"
      data-test="card-default"
    />

    <BottomCard
      :id="id"
      :value="value"
      :suit="suit"
      v-if="visible && bottomCard"
      data-test="card-bottom"
    />

    <CardPlaceholder v-if="!visible" data-test="card-hidden" />
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
      default: 0,
    },
    value: {
      type: String,
      default: 'A',
    },
    suit: {
      type: String,
      default: 'c',
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
  },
  computed: {
    ...mapGetters(['selectedCardId']),
    classes() {
      const { selectedCardId } = this;
      const { id, clickable, visible } = this;

      return {
        'card--is-selected': selectedCardId === id,
        'card--is-not-clickable': !clickable,
        'card--is-draggable': visible,
      };
    },
    cardTestName() {
      const { value, suit, visible } = this;

      if (visible) {
        return `card-${value}${suit}`;
      }

      return 'card';
    },
    cardSuitName() {
      const { suit, visible } = this;

      if (visible) {
        return suit;
      }

      return '';
    },
  },
  methods: {
    ...mapActions(['setCard']),
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
      const clonedElement = this.cloneCards();
      const clonedElementOffset = this.$refs.card.clientWidth / 2;

      e.dataTransfer.setDragImage(clonedElement, clonedElementOffset, 20);
      e.dataTransfer.dropEffect = 'move';

      this.setCard(id);
    },
    cloneCards() {
      const clonedElement = document.createElement('div');
      clonedElement.id = 'cloned-card';
      clonedElement.style.marginLeft = '-2000px';
      clonedElement.style.marginTop = '-2000px';

      // Find cards below selected card.
      const siblingCards = [...this.$refs.card.parentElement.children];
      const selectedCard = siblingCards.findIndex((card) => card === this.$refs.card);
      const clonedCards = siblingCards.slice(selectedCard);

      clonedCards.forEach((card) => {
        card.classList.add('card--is-cloned');
        clonedElement.appendChild(card.cloneNode(true));
      });

      document.body.appendChild(clonedElement);

      return clonedElement;
    },
    clearCard() {
      document.querySelector('#cloned-card').remove();
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;

  &:nth-of-type(n + 2) {
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

  &::before {
    transition: all 0.1s ease-in-out;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    pointer-events: none;

    @media (min-width: $bp-sm) {
      border-radius: 3px;
    }

    @media (min-width: $bp-lg) {
      border-radius: 7px;
    }
  }

  &--is-selected {
    &::before {
      background: rgba(0, 0, 0, 0.3);
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

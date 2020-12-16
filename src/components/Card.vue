<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    @dragend="clearCard()"
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

export default {
  name: 'Card',
  components: {
    DefaultCard,
    BottomCard,
    CardPlaceholder,
  },
  props: {
    id: {
      type: Number,
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

      return `${value}${suit}`;
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
      const { card } = this.$refs;
      const clonedElement = document.createElement('div');
      const styles = {
        width: `${card.clientWidth}px`,
        marginLeft: '-2000px',
        marginTop: '-2000px',
      };

      Object.assign(clonedElement.style, styles);
      Object.assign(clonedElement.id, 'cloned-card');

      // Find cards below selected card.
      const siblingCards = [...card.parentElement.children];
      const selectedCard = siblingCards.findIndex((siblingCard) => siblingCard === card);
      const clonedCards = siblingCards.slice(selectedCard);

      clonedCards.forEach((clonedCard) => {
        clonedCard.classList.add('card--is-cloned');
        clonedElement.appendChild(clonedCard.cloneNode(true));
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

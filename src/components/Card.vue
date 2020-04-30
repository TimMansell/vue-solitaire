<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    @dragend="clearCard()"
    :draggable="visible"
    ref="card"
    :data-card-suit="cardSuit"
    :data-test="cardTestName"
  >
    <TouchEvents
      @swipe="autoMoveCard($event, id)"
      @doubletap="autoMoveCard($event, id)"
      :disabled="!disableEvents"
    >
      <SvgIcon
        v-if="visible"
        data-test="card-visible"
        :name="`${this.value}${this.suit.toUpperCase()}`"
      />
    </TouchEvents>

    <CardPlaceholder v-if="!visible" data-test="card-hidden" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SvgIcon from '@/components/SvgIcon.vue';
import TouchEvents from '@/components/TouchEvents.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

export default {
  name: 'Card',
  components: {
    SvgIcon,
    TouchEvents,
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
    disableEvents: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCardDragged: false,
    };
  },
  computed: {
    ...mapGetters(['selectedCardId']),
    classes() {
      const { selectedCardId } = this;
      const { id, isCardDragged, clickable, visible } = this;

      return {
        'card--is-selected': selectedCardId === id && !isCardDragged,
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
    cardSuit() {
      const { suit, visible } = this;

      if (visible) {
        return suit;
      }

      return '';
    },
  },
  methods: {
    ...mapActions(['setCard', 'autoMoveCardToFoundation']),
    selectCard(e, id) {
      const { selectedCardId } = this;

      if (!selectedCardId) {
        e.stopPropagation();

        if (this.clickable && this.visible) {
          this.setCard(id);
        }
      }
    },
    autoMoveCard(e, id) {
      if (this.clickable && this.visible) {
        this.autoMoveCardToFoundation(id);
      }
    },
    dragCard(e, id) {
      const clonedElement = this.cloneCards();
      const clonedElementOffset = this.$refs.card.clientWidth / 2;

      e.dataTransfer.setDragImage(clonedElement, clonedElementOffset, 20);
      e.dataTransfer.dropEffect = 'move';

      this.isCardDragged = !this.isCardDragged;

      this.setCard(id);
    },
    cloneCards() {
      const clonedElement = document.createElement('div');
      clonedElement.id = 'cloned-card';
      clonedElement.style.marginLeft = '-2000px';
      clonedElement.style.marginTop = '-2000px';

      // Find cards below selected card.
      const siblingCards = [...this.$refs.card.parentElement.childNodes];
      const selectedCard = siblingCards.findIndex((card) => card === this.$refs.card);
      const clonedCards = siblingCards.slice(selectedCard);

      clonedCards.forEach((card) => {
        clonedElement.appendChild(card.cloneNode(true));
      });

      document.body.appendChild(clonedElement);

      return clonedElement;
    },
    clearCard() {
      document.querySelector('#cloned-card').remove();

      this.isCardDragged = !this.isCardDragged;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  transition: all 0.05s ease-in-out;
  transform-style: preserve-3d;

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

  &--is-selected {
    transform: scale(1.1);
  }

  &--is-not-clickable {
    pointer-events: none;
  }

  &--is-draggable {
    cursor: grab;
  }
}
</style>

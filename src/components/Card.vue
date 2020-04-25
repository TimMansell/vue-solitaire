<template>
  <div
    class="card"
    :class="classes"
    @click="selectCard($event, id)"
    @dragstart="dragCard($event, id)"
    @dragend="clearCard()"
    :draggable="visible"
    ref="card"
    :data-test="`card-${value}${suit}`"
  >
    <TouchEvents @swipe="autoMoveCard($event, id)" @doubletap="autoMoveCard($event, id)">
      <SvgIcon
        v-if="visible"
        data-test="card-visible"
        :name="`${this.value}${this.suit.toUpperCase()}`"
      />
    </TouchEvents>

    <SvgIcon v-if="!visible" data-test="card-hidden" name="Card_back_17" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SvgIcon from '@/components/SvgIcon.vue';
import TouchEvents from '@/components/TouchEvents.vue';

export default {
  name: 'Card',
  components: {
    SvgIcon,
    TouchEvents,
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
  data() {
    return {
      isCardDragged: false,
    };
  },
  computed: {
    ...mapGetters(['selectedCardId']),
    classes() {
      const { selectedCardId } = this;
      const { id, suit, isCardDragged, clickable, visible } = this;

      return {
        'card--is-s': suit === 's',
        'card--is-d': suit === 'd',
        'card--is-h': suit === 'h',
        'card--is-c': suit === 'c',
        'card--is-selected': selectedCardId === id && !isCardDragged,
        'card--is-not-clickable': !clickable,
        'card--is-draggable': visible,
      };
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
      // e.stopPropagation();

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
    pointer-events: none;
  }

  &--is-draggable {
    cursor: grab;
  }
}
</style>

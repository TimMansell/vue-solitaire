<template>
  <TouchEvents
    @swipe="autoMoveCard($event, id)"
    @doubletap="autoMoveCard($event, id)"
  >
    <DefaultCard :value="value" />
  </TouchEvents>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DefaultCard from '@/components/DefaultCard.vue';
import TouchEvents from '@/components/TouchEvents.vue';

export default {
  name: 'Card',
  components: {
    DefaultCard,
    TouchEvents,
  },
  props: {
    id: {
      type: [String, Number],
      default: 0,
    },
    value: {
      type: String,
      default: 'A♣',
    },
  },
  computed: {
    ...mapGetters(['isDisabledGame']),
  },
  methods: {
    ...mapActions(['autoMoveCardToFoundation']),
    autoMoveCard(e, id) {
      const { isDisabledGame } = this;

      if (isDisabledGame) return;

      this.autoMoveCardToFoundation(id);
    },
  },
};
</script>

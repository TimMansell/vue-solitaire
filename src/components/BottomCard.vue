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
    ...mapGetters(['isGamePaused']),
  },
  methods: {
    ...mapActions(['autoMoveCardToFoundation']),
    autoMoveCard(e, id) {
      const { isGamePaused } = this;

      if (isGamePaused) return;

      this.autoMoveCardToFoundation(id);
    },
  },
};
</script>

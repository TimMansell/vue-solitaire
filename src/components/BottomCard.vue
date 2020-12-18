<template>
  <TouchEvents
    @swipe="autoMoveCard($event, id)"
    @doubletap="autoMoveCard($event, id)"
  >
    <DefaultCard :value="value" />
  </TouchEvents>
</template>

<script>
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions(['autoMoveCardToFoundation']),
    autoMoveCard(e, id) {
      this.autoMoveCardToFoundation(id);
    },
  },
};
</script>

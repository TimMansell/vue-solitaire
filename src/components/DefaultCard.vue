<template>
  <SvgIcon :name="cardName" />
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
  },
  computed: {
    cardName() {
      const { suit, value } = this;

      return `${value}${suit.toUpperCase()}`;
    },
  },
};
</script>

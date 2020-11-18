<template>
  <SvgIcon :name="cardName" :width="width" />
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
    width: {
      type: Number,
      default: 0,
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

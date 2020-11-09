<template>
  <span>
    {{ formattedCount }}
  </span>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'Counter',
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedCount() {
      const { number } = this;

      return numeral(number).format('0,0');
    },
  },
};
</script>

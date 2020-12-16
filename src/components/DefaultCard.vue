<template>
  <SvgIcon :name="value" />
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
      default: 'A♣',
    },
  },
};
</script>

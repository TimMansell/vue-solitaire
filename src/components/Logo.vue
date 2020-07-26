<template>
  <img :src="logo" width="150" />
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
  name: 'Logo',
  data() {
    return {
      logo,
    };
  },
};
</script>

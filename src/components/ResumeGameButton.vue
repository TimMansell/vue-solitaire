<template>
  <Button route="home" data-test="resume-game-btn"> Resume </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ResumeGameButton',
  components: {
    Button,
  },
};
</script>

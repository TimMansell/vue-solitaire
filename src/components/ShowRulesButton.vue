<template>
  <Button
    @click="$router.replace('/rules')"
    :is-stacked="true"
    :check-disabled="true"
    data-test="game-rules-btn"
    title="How to Play"
  >
    <FontAwesomeIcon :icon="rulesIcon" />
  </Button>
</template>

<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from './Button.vue';

export default {
  name: 'ShowRules',
  components: {
    Button,
    FontAwesomeIcon,
  },
  data() {
    return {
      rulesIcon: faQuestionCircle,
    };
  },
};
</script>

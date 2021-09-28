<template>
  <RouterLink to="/rules">
    <Button :is-stacked="true" data-test="game-rules-btn" title="How to Play">
      <FontAwesomeIcon :icon="rulesIcon" />
    </Button>
  </RouterLink>
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

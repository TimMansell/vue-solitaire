<template>
  <Button
    :is-stacked="isStacked"
    @click="toggleRules"
    data-test="game-rules-btn"
    title="How to Play"
  >
    <FontAwesomeIcon :icon="rulesIcon" />
  </Button>
</template>

<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ShowRules',
  components: {
    Button,
    FontAwesomeIcon,
  },
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rulesIcon: faQuestionCircle,
    };
  },
  methods: {
    ...mapActions(['toggleRules']),
  },
};
</script>

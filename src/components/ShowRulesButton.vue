<template>
  <Button
    @click="viewRules"
    :is-stacked="true"
    data-test="game-rules-btn"
    title="How to Play"
  >
    <FontAwesomeIcon :icon="rulesIcon" />
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions(['setGamePaused']),
    viewRules() {
      this.setGamePaused(true);

      this.$router.push('/rules');
    },
  },
};
</script>

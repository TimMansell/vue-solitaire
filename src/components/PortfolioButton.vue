<template>
  <Button
    :is-stacked="true"
    @click="gotoUrl"
    data-test="github-btn"
    title="Visit my Portfolio"
  >
    <FontAwesomeIcon :icon="githubIcon" />
  </Button>
</template>

<script>
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from './Button.vue';

export default {
  name: 'PortfolioButton',
  components: {
    Button,
    FontAwesomeIcon,
  },
  data() {
    return {
      githubIcon: faGlobeAsia,
    };
  },
  methods: {
    gotoUrl() {
      window.open('https://timmansell.com', '_blank');
    },
  },
};
</script>

<template>
  <Button
    :is-stacked="true"
    @click="gotoUrl"
    data-test="github-btn"
    title="Visit Github Repository"
  >
    <FontAwesomeIcon :icon="githubIcon" />
  </Button>
</template>

<script>
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from './Button.vue';

export default {
  name: 'GithubButton',
  components: {
    Button,
    FontAwesomeIcon,
  },
  data() {
    return {
      githubIcon: faGithub,
    };
  },
  methods: {
    gotoUrl() {
      window.open('https://github.com/TimMansell/vue-solitaire', '_blank');
    },
  },
};
</script>

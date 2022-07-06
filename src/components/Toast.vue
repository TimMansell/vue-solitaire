<template>
  <div :data-test="testId">
    <FontAwesomeIcon :icon="displayIcon" />
    {{ content }}
  </div>
</template>

<script>
import {
  faCheckCircle,
  faClock,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Toast',
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      validator(value) {
        return ['clock', 'check-circle', 'exclamation-circle'].includes(value);
      },
      default: 'exclamation-circle',
    },
  },
  computed: {
    displayIcon() {
      const { icon } = this;
      const iconToUse = [faClock, faCheckCircle, faExclamationCircle].find(
        ({ iconName }) => iconName === icon
      );

      return iconToUse;
    },
    testId() {
      const { id } = this;

      return `toast-${id}`;
    },
  },
};
</script>

<style lang="scss">
$vt-toast-min-width: auto;
$vt-color-default: var(--col-secondary);
$vt-text-color-default: var(--col-tertiary);

@import 'vue-toastification/src/scss/variables';
@import 'vue-toastification/src/scss/toastContainer';
@import 'vue-toastification/src/scss/toast';
@import 'vue-toastification/src/scss/progressBar';
@import 'vue-toastification/src/scss/animations/bounce';

/* stylelint-disable selector-class-pattern */
.Vue-Toastification {
  &__toast {
    margin-bottom: 0;

    @media (min-width: $bp-sm) {
      margin-bottom: var(--mg-lg);
    }
  }
}
/* stylelint-enable selector-class-pattern */
</style>

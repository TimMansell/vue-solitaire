<template>
  <div class="toast">
    <div class="toast__wrapper">
      <div class="toast__content">
        <h2 class="toast__header" v-if="title" data-test="toast-header">
          {{ title }}
        </h2>
        <div class="toast__msg">
          <div v-for="(msg, index) in msgs" :key="index">
            {{ msg }}
          </div>
        </div>
      </div>
      <Button type="alt" @click="btnClick">
        {{ btnText }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Toast',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    msgs: {
      type: Array,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: calc(var(--z-overlay) + 1);
  padding: var(--pd-sm);
  color: var(--col-tertiary);

  @media (min-width: $bp-sm) {
    width: auto;
  }

  &__wrapper {
    display: flex;
    position: relative;
    border: 1px solid var(--bdr-secondary);
    border-radius: 7px;
    padding: var(--pd-sm);
    background: var(--bg-secondary);

    @media (min-width: $bp-xs) {
      align-items: flex-end;
    }
  }

  &__content {
    flex: 1;
    line-height: 1.3;
    width: 100%;
    text-align: left;
  }

  &__header {
    margin-bottom: 0;
    color: var(--col-primary);

    &:empty {
      margin-bottom: 0;
    }
  }

  &__msg {
    display: none;
    margin-bottom: 0;
    margin-right: var(--mg-md);

    @media (min-width: $bp-xs) {
      display: block;
    }
  }
}
</style>

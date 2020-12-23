<template>
  <div>
    <div class="columns" data-test="columns" ref="columns">
      <Column
        v-for="(column, index) in boardCards"
        :key="index"
        :column-no="index"
        :cards="column"
      />
    </div>
    <DraggedCards :width="cardWidth" />
  </div>
</template>

<script>
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
import { debounce } from 'throttle-debounce';
import { mapGetters } from 'vuex';
import Column from '@/components/Column.vue';
import DraggedCards from '@/components/DraggedCards.vue';

export default {
  name: 'Columns',
  components: {
    Column,
    DraggedCards,
  },
  data() {
    return {
      cardWidth: 150,
    };
  },
  computed: {
    ...mapGetters(['boardCards']),
  },
  mounted() {
    const events = {
      resize: debounce(300, false, this.getColumnWidth),
    };

    this.events = addEventListener(events);

    this.getColumnWidth();
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    getColumnWidth() {
      const { columns } = this.$refs;
      const card = columns.childNodes[0].childNodes[0];
      const { clientWidth } = card;

      this.cardWidth = clientWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.columns {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-flow: column;
  padding-left: var(--pd-xs);
  padding-right: var(--pd-xs);

  @media (min-width: $bp-lg) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

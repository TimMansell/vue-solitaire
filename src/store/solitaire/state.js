import { columns } from '../../config/settings.json';

// Return state as function so we can reset it.
const state = () => ({
  cards: [[], [], [], [], [], [], [], []],
  foundation: [[], [], [], []],
  placeholders: columns,
  selectedCardId: null,
  draggedCards: [],
  isNewGame: true,
});

export default state;

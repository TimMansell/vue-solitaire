import { columns } from '@/services/solitaire/config';

// Return state as function so we can reset it.
const state = () => ({
  cards: [[], [], [], [], [], [], [], []],
  foundation: [[], [], [], []],
  moves: [],
  time: 0,
  hasGameWon: false,
  hasGameLost: false,
  placeholders: columns,
  selectedCardId: null,
  draggedCards: [],
});

export default state;

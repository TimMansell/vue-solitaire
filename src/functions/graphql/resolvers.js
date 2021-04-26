import { queries } from './resolvers/queries';
import { mutations } from './mutations';
import { userStats } from './resolvers/userStats';
import { globalStats } from './resolvers/globalStats';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: queries,
  Mutation: mutations,
  UserStats: userStats,
  GlobalStats: globalStats,
};

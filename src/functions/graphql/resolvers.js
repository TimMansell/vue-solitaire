import { queries } from './resolvers/queries';
import { mutations } from './resolvers/mutations';
import { userStats } from './resolvers/userStats';
import { globalStats } from './resolvers/globalStats';
import { findUser } from './resolvers/findUser';
import { user } from './resolvers/user';
import { leaderboards } from './resolvers/leaderboards';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: queries,
  Mutation: mutations,
  UserStats: userStats,
  GlobalStats: globalStats,
  FindUser: findUser,
  User: user,
  Leaderboards: leaderboards,
};

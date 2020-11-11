import { queries } from './queries';
import { mutations } from './mutations';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: queries,
  Mutation: mutations,
};

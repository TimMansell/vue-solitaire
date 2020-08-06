import { queries } from './resolvers/query';
import { mutations } from './resolvers/mutation';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: queries,
  Mutation: mutations,
};

// server/src/schemas/resolvers.ts
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models/User';
import { signToken } from '../services/auth';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.req.user) {
        return await User.findById(context.req.user._id).select('-__v -password');
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_: any, { input }: any, context: any) => {
      if (context.req.user) {
        return await User.findByIdAndUpdate(
          context.req.user._id,
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
    removeBook: async (_: any, { bookId }: any, context: any) => {
      if (context.req.user) {
        return await User.findByIdAndUpdate(
          context.req.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

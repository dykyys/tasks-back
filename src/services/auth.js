import { randomBytes } from 'crypto';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date('9999-12-31'),
  refreshTokenValidUntil: new Date('9999-12-31'),
});

export const register = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (user) {
    await SessionCollection.deleteOne({ userId: user._id });
    return SessionCollection.create({
      userId: user._id,
      ...createSessionData(),
    });
  }

  const newUser = await UserCollection.create({
    ...payload,
  });

  return SessionCollection.create({
    userId: newUser._id,
    ...createSessionData(),
  });
};

export const getUser = (filter) => UserCollection.findOne(filter);
export const getSession = (filter) => SessionCollection.findOne(filter);

import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date('9999-12-31'),
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: new Date('9999-12-31'),
  });
};

export const registerController = async (req, res) => {
  const session = await authServices.register(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

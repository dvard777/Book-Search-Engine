// server/src/services/auth.ts
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
const expiration = '2h';

export const authMiddleware = ({ req }: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as any;
    req.user = data;
  } catch (err) {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = (user: any) => {
  const payload = { _id: user._id, username: user.username, email: user.email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

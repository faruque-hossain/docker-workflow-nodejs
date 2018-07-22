import { Router } from 'express';
import { userInfo } from 'os';
const router = Router();

router.get('/', (req, res, next) => {
  return res.json({
    hello: 'node',
    environment: process.env.NODE_ENV || null,
    runing: {
      username: userInfo().username
    }
  });
});

export default router;

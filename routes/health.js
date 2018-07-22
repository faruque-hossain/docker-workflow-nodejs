// health.js
import { Router } from 'express';

const router = Router();
router.get('/', (req, res, next) => {
  console.log('get');
  return res.json({
    healthy: true
  });
});

export default router;

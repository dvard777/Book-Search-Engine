// server/src/routes/api/index.ts
import userRoutes from './user-routes';
const router = require('express').Router();

router.use(userRoutes);

export default router;

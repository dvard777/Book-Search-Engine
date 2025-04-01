// server/src/routes/api/user-routes.ts
import { Router } from 'express';
import { addUser, login, saveBook, removeBook } from '../../controllers/user-controller';

const router = Router();

router.post('/users', addUser);
router.post('/login', login);
router.post('/books', saveBook);
router.delete('/books/:bookId', removeBook);

export default router;

import express from 'express';
const router = express.Router();
import {
  store,
  index,
  update,
  getById,
  destroy,
} from '../controllers/interviewType.controller';
import {
  dataValidator,
  idValidator,
  validate,
} from '../validators/interviewType.validator';
import auth from '../middlewares/auth.middleware';

// Create a new interview type
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/', dataValidator, auth, validate, store);

// Get all interview types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/', auth, index);

// Get a single interview type by ID
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/:id', [...idValidator], validate, auth, getById);

// Update an interview type by ID

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.put('/:id', [...idValidator, ...dataValidator], validate, auth, update);

// Delete an interview type by ID
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.delete('/:id', idValidator, validate, auth, destroy);

export default router;

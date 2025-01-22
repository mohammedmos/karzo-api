import express from 'express';
const router = express.Router();
import { store, getById, index, update, destroy } from '../controllers/question.controller';
import { qDataVal, idValidator, validate } from '../validators/interviewType.validator';
import auth from '../middlewares/auth.middleware';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/', qDataVal, validate, auth, store);

// Get all questions
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/', auth, index);

// Get a single question by ID
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/:id', idValidator, validate, auth, getById);

// Update a question by ID
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.put('/:id', [...idValidator, ...qDataVal], validate, auth, update);

// Delete a question by ID
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.delete('/:id', idValidator, validate, auth, destroy);

export default router;

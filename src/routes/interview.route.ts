import express from 'express';
const router = express.Router();
import { store, getById } from '../controllers/interview.controller';
import { idValidator, validate } from '../validators/interviewType.validator';

router.post('/', store);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.get('/:id', [...idValidator], validate, getById);

export default router;

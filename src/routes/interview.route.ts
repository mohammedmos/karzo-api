import express from 'express';
const router = express.Router();
import { store } from '../controllers/interview.controller';

router.post('/', store);
export default router;

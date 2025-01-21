import { body, param, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

// Validation rules for creating/updating an interview type
export const dataValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('slug_ar').notEmpty().withMessage('Arabic slug is required'),
  body('slug_fr').notEmpty().withMessage('French slug is required'),
];

// Validation rule for ID parameter
export const idValidator = [
  param('id').isInt().withMessage('ID must be a valid integer'),
];

// Middleware to handle validation errors
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

// Validator for adding an admin
export const addAdminValidators = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('companyEmail').notEmpty().withMessage('Company email is required'),
];

// Validator for adding a company
export const loginValidators = [
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

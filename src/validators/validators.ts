import { body } from 'express-validator';

// Validator for adding an admin
export const addAdminValidators = [
  body('name').notEmpty().withMessage('Name is required'),
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

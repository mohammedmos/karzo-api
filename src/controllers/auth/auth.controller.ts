import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../../models/Admin';
import { validationResult } from 'express-validator';
// import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, companyEmail, companyName } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create a new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await newAdmin?.createCompany({
      name: companyName,
      email: companyEmail,
    });
    res
      .status(201)
      .json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);
  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id }, 'this-is-kar');

    res.status(200).json({ token, admin });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: req.body ?? 'test' });
};

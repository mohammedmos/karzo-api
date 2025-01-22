import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { User } from '../models';

const router = express.Router();

// Configure multer to store files with their original names and extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.put('/:userId', upload.single('cv'), async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { phoneNumber } = req.body;
  const cvPath = req.file ? req.file.path : null;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (phoneNumber) user.phone = phoneNumber;
    if (cvPath) user.cv = cvPath;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;

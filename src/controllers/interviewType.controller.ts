import { Request, Response } from 'express';
import { InterviewType } from '../models/InterviewType';
import { Admin } from '../models/Admin';
import { Company } from '../models/Company';
import { Question } from '../models/Question';
export const store = async (req: Request, res: Response) => {
  try {
    const { name, slug, slug_ar, slug_fr, auth_id } = req.body;
    const admin = await Admin.findByPk(auth_id.id, {
      include: [{ model: Company, as: 'company' }],
    });
    const company = admin?.company;
    if (!company) {
      return res
        .status(404)
        .json({ error: 'Company not found for the given Admin' });
    }

    const interviewType = await InterviewType.create({
      name,
      slug,
      slug_ar,
      slug_fr,
      company_id: company.id ?? 1,
    });

    res.status(201).json({
      message: 'Interview type created successfully',
      data: interviewType,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const interviewTypes = await InterviewType.findAll();
    res.status(200).json({ data: interviewTypes });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single interview type by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const interviewType = await InterviewType.findByPk(id, {
      include: [{ model: Question, as: 'questions' }],
    });
    if (!interviewType) {
      return res.status(404).json({ error: 'Interview type not found' });
    }
    res.status(200).json({ data: interviewType });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an interview type by ID
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, slug_ar, slug_fr } = req.body;
    const interviewType = await InterviewType.findByPk(id);
    if (!interviewType) {
      return res.status(404).json({ error: 'Interview type not found' });
    }
    await interviewType.update({ name, slug, slug_ar, slug_fr });
    res.status(200).json({
      message: 'Interview type updated successfully',
      data: interviewType,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an interview type by ID
export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const interviewType = await InterviewType.findByPk(id);
    if (!interviewType) {
      return res.status(404).json({ error: 'Interview type not found' });
    }
    await interviewType.destroy();
    res.status(200).json({ message: 'Interview type deleted successfully' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

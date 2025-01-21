import { Question } from '../models/Question';
import { Request, Response } from 'express'; // Replace with your actual model

// Create a new question
export const store = async (req: Request, res: Response) => {
  try {
    const { sentence, sentence_ar, sentence_fr, interview_type_id } = req.body;
    const question = await Question.create({
      sentence,
      sentence_ar,
      sentence_fr,
      interview_type_id,
    });
    res
      .status(201)
      .json({ message: 'Question created successfully', data: question });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all questions
export const index = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const interview_type_id = parseInt(req.query.interview_type_id);
    const questions = await Question.findAll({ where: { interview_type_id } });
    res.status(200).json({ data: questions });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single question by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ data: question });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a question by ID
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { sentence, sentence_ar, sentence_fr, interview_type_id } = req.body;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    await question.update({
      sentence,
      sentence_ar,
      sentence_fr,
      interview_type_id,
    });
    res
      .status(200)
      .json({ message: 'Question updated successfully', data: question });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a question by ID
export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    await question.destroy();
    res.status(200).json({ message: 'Question deleted successfully' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

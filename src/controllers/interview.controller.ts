import { Request, Response } from 'express';
import { Response as Answer, Interview, Report, User } from '../models';
import { sequelize } from '../database/sequelize';

export const store = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, email } = req.body.user;
    const { interview_type_id, responses } = req.body;
    const { title, overall_evaluation, report_data } = req.body.report;

    // Check if the user already exists
    let user: User | null = await User.findOne({ where: { email }, transaction });

    if (!user) {
      try {
        // Attempt to create the user
        user = await User.create({ name, email }, { transaction });
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (err.name === 'SequelizeUniqueConstraintError') {
          // If the user already exists, fetch the existing user
          user = await User.findOne({ where: { email }, transaction });
          if (!user) {
            throw new Error('User could not be found after unique constraint violation');
          }
        } else {
          throw err; // Re-throw other errors
        }
      }
    }

    // Create the interview
    const interview = await Interview.create({ user_id: user.id, interview_type_id }, { transaction });

    // Create the responses
    const answersWithInterviewId = responses.map((item: { question: string; response: string }) => ({
      question: item.question,
      answer: item.response,
      interview_id: interview.id,
    }));
    for (const element of answersWithInterviewId) {
      await Answer.create(element, { transaction });
    }

    // Create the report
    await Report.create(
      {
        overall_evaluation: overall_evaluation,
        user_id: user.id,
        interview_id: interview.id,
        title: title,
        report_data: report_data,
      },
      { transaction }
    );

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({
      message: 'Report created successfully',
      data: interview,
    });
  } catch (err) {
    // Rollback the transaction on error
    await transaction.rollback();
    console.error('Transaction failed:', err);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'A user with this email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Get a single interview type by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Answer, as: 'responses' },
        { model: Report, as: 'report' },
      ],
    });
    if (!interview) {
      return res.status(404).json({ error: 'Interview type not found' });
    }
    // console.log(interview);
    res.status(200).json({ data: interview });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

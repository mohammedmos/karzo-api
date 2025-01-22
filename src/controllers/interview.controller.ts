import { Request, Response } from 'express';
import { Response as Answer, Interview, Report, User } from '../models';
import { sequelize } from '../database/sequelize';

export const store = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { name, email } = req.body.user;
    const { interview_type_id, responses } = req.body;
    const { title, overall_evaluation, report_data } = req.body.report;
    const user = await User.create({ name, email }, { transaction });
    const interview = await Interview.create({ user_id: user.id, interview_type_id }, { transaction });
    const answersWithInterviewId = responses.map((item: { question: string; response: string }) => ({
      question: item.question,
      answer: item.response,
      interview_id: interview.id,
    }));
    for (const element of answersWithInterviewId) {
      await Answer.create(element, { transaction });
    }

    const report = await Report.create(
      {
        overall_evaluation: overall_evaluation,
        user_id: user.id,
        interview_id: interview.id,
        title: title,
        report_data: report_data,
      },
      { transaction }
    );
    await transaction.commit();

    res.status(201).json({
      message: 'Report created successfully',
      data: report,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await transaction.rollback();
    console.error('Transaction failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

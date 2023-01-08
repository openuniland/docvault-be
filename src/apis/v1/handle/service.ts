import { ErrorCodes, HttpException } from 'exceptions';
import UserExamModel from 'models/schema/UserExam';
import UserAnswerModel from 'models/schema/UserAnswer';
import Answer from 'models/types/Answer';
import Question from 'models/types/Question';
import { logger } from 'utils/logger';
//Get a user-exam by id
export const getUserExamById = async (id: string) => {
  try {
    const userExam = await UserExamModel.find({ _id: id })
      .populate('author')
      .populate({
        path: 'exam',
        populate: {
          path: 'questions',
          populate: [
            {
              path: 'subject',
              model: 'subject',
            },
            {
              path: 'correct_answer',
              model: 'answer',
            },
            {
              path: 'answers',
              model: 'answer',
            },
          ],
        },
      });
    const userAnswer = await UserAnswerModel.find({ user_exam: id }).populate('answers').populate('user_exam');

    const questionOfExam = (object: any) => {
      let result: Array<Question> = [];
      for (let key in object) {
        result = object[key].exam.questions;
      }
      return result;
    };

    const answersOfUser = (object: any) => {
      let result: Array<Answer> = [];
      for (let key in object) {
        result = object[key].answers;
      }
      return result;
    };
    const arrayQuestion = questionOfExam(userExam);

    const arrayUserAnswer = answersOfUser(userAnswer);

    const result = arrayQuestion.map((item, index) => {
      return {
        _id: item.id,
        content: item.content,
        subject: item.subject,
        correct_answer: item.correct_answer,
        user_answer: arrayUserAnswer[index],
        answers: item.answers,
        is_deleted: item.is_deleted,
        accuracy: item.accuracy,
        is_essay: item.is_essay,
        is_approved: item.is_approved,
      };
    });
    const newUserExam = userExam.map((item) => {
      return {
        author: item.author,
        questions: result,
        duration: item.duration,
        is_deleted: item.is_deleted,
        is_completed: item.is_completed,
      };
    });
    logger.info(typeof questionOfExam);
    logger.info(`Get a user exam successfully`);

    return newUserExam;
  } catch (error) {
    logger.error(`Error while get a user exam by id: ${error}`);
    throw new HttpException(400, ErrorCodes.BAD_REQUEST.MESSAGE, ErrorCodes.BAD_REQUEST.CODE);
  }
};

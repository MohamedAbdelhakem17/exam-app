declare type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

declare type ExamResponse = {
  metadata: {
    nextPage: number;
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  exams: Exam[];
};

type Question = {
  QID: string;
  Question: string;
  correctAnswer: string;
  inCorrectAnswer?: string;
};

type ExamResultType = {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: Question[];
  correctQuestions: Question[];
};

declare type Answer = {
  questionId: string;
  correct: string;
};

declare type AnswerCheck = {
  answers: Answer[];
  time: number;
};

declare type QuestionAnswer = {
  answer: string;
  key: string;
};

declare type QuestionType = {
  _id: string;
  createdAt: string;
  answers: QuestionAnswer[];
  correct: string;
  question: string;
};

declare type ExamData = {
  subjectName: string | null;
  examName: string | null;
  duration: string | null;
  questions: QuestionType[];
};

declare type QuestionsResponse = {
  questions: {
    answers: {
      answer: string;
      key: string;
    }[];
    type: string;
    _id: string;
    question: string;
    correct: string;
    subject: {
      _id: string;
      name: string;
      icon: string;
      createdAt: string;
    } | null;
    exam: {
      _id: string;
      title: string;
      duration: string;
      subject: string;
      numberOfQuestions: string;
      active: boolean;
      createdAt: string;
    };
    createdAt: string;
  }[];
};

declare type MapQuestionsResponse = {
  subjectName: string | null;
  examName: string | null;
  duration: string | null;
  questions: {
    question: string;
    _id: string;
    createdAt: string;
    answers: {
      answer: string;
      key: string;
    }[];
    correct: string;
  }[];
};

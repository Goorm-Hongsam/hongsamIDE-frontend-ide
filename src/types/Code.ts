type TGrade = 'all' | 'example';

export type TCode = {
  questionId: string;
  uuid: string;
  language: string;
  requestCode?: string;
  gradeType?: TGrade;
};

export type TResult = {
  compileError: boolean;
  correctResult: boolean[];
  errorMessage: string | null;
  originAnswer: string[];
  printResult: string[];
  timeResult: number[];
};

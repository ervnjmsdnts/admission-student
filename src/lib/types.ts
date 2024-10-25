import { Inputs } from '@/app/admission/form/schema';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  type: 'new' | 'transferee' | 'returning';
  role: 'user' | 'admin';
  phoneNumber: string;
};

type ParsedInputs = {
  [K in keyof Inputs['documents']]: string;
};

export type Admission = {
  id: string;
  status:
    | 'forReview'
    | 'rejected'
    | 'approved'
    | 'onGoingExamination'
    | 'completeExamination';
  userId: string;
  createdAt: number;
  examination?: {
    scheduleDate: number;
    examForm: string;
    completeExamDate?: number;
  };
  form: Omit<Inputs, 'documents' | 'dateOfBirth'> & {
    documents: ParsedInputs;
    dateOfBirth: number;
  };
};

export type Examination = {
  id: string;
  program: string;
  createdAt: number;
  isActive: boolean;
  link: string;
};

export type Notice = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  isActive: boolean;
};

import { Inputs } from '@/app/admission/form/schema';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phoneNumber: string;
};

type ParsedInputs = {
  [K in keyof Inputs['documents']]: string;
};

export type Admission = {
  id: string;
  status: 'forReview' | 'rejected' | 'approved';
  userId: string;
  createdAt: number;
  form: Omit<Inputs, 'documents' | 'dateOfBirth'> & {
    documents: ParsedInputs;
    dateOfBirth: number;
  };
};

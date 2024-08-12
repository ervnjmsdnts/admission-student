'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormProfile from './_components/form-profile';
import FormEducation from './_components/form-education';
import FormReferences from './_components/form-references';
import FormUploadDocuments from './_components/form-upload-documents';
import FormStepper from './_components/form-stepper';
import { FormDataSchema, Inputs } from './schema';
import { steps } from './steps';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function AdmissionFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      references: [],
      married: {
        ceremony: [],
      },
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const { documents, ...dataWithoutDocuments } = data;
      const documentEntries = Object.entries(data.documents);

      const parsedDocuments = await Promise.all(
        documentEntries.map(async ([key, file]) => {
          if (file && file?.name) {
            const fileRef = ref(storage, `documents/${file.name}`);
            const uploadTask = await uploadBytes(fileRef, file);
            const url = await getDownloadURL(uploadTask.ref);
            return {
              [key]: url,
            };
          } else {
            return { [key]: '' };
          }
        }),
      );

      const documentsObject = parsedDocuments.reduce((acc, doc) => {
        return { ...acc, ...doc };
      }, {});

      const payload = {
        userId: localStorage.getItem('user_id'),
        form: {
          ...dataWithoutDocuments,
          dateOfBirth: new Date(data.dateOfBirth).getTime(),
          documents: documentsObject,
        },
        status: 'forReview',
        createdAt: new Date().getTime(),
      };

      await addDoc(collection(db, 'admissions'), payload);

      toast({
        title:
          'Successfully submitted. Please wait while we are reviewing your admission',
      });

      router.push('/admission');
    } catch (error) {
      toast({ variant: 'destructive', title: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  type FormField = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FormField[]);

    if (!output) return;

    if (currentStep === 3) {
      await form.handleSubmit(processForm)();
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className='container h-full flex flex-col items-start w-full'>
      <Button variant='link' className='pb-4' asChild>
        <Link href='/admission'>
          <ArrowLeft className='mr-2' />
          Go Back
        </Link>
      </Button>
      <div className='bg-white flex-grow overflow-y-auto p-4 rounded-lg h-0 w-full'>
        <h1 className='text-xl font-semibold mb-8'>Admission Form</h1>
        <FormStepper currentStep={currentStep} />
        <Form {...form}>
          <form className='pt-8' onSubmit={form.handleSubmit(processForm)}>
            {currentStep === 0 && <FormProfile form={form} />}
            {currentStep === 1 && <FormEducation form={form} />}
            {currentStep === 2 && <FormReferences form={form} />}
            {currentStep === 3 && <FormUploadDocuments form={form} />}
          </form>
        </Form>
        <div className='pt-4'>
          <div className='flex justify-between'>
            <Button type='button' disabled={currentStep === 0} onClick={prev}>
              Back
            </Button>
            <Button type='button' onClick={next} disabled={isLoading}>
              {isLoading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
              {currentStep === 3 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

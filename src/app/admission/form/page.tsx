'use client';

import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
});

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'fullName',
      'gender',
      'dateOfBirth',
      'program',
      'religion',
      'motherName',
      'fatherName',
      'correspondanceAddress',
      'permanentAddress',
      'studentImage',
      'nationality',
    ],
  },
  {
    id: 'Step 2',
    name: 'Education',
    fields: [
      'elementaryName',
      'elementaryYear',
      'secondaryName',
      'secondaryYear',
      'undergraduateName',
      'undergraduateYear',
    ],
  },
  { id: 'Step 3', name: 'Upload Documents' },
];

export default function AdmissionFormPage() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 2) {
      await handleSubmit(processForm)();
      return;
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  return (
    <div className='container h-full'>
      <Button variant='link' className='pb-4' asChild>
        <Link href='/admission'>
          <ArrowLeft className='mr-2' />
          Go Back
        </Link>
      </Button>
      <div className='bg-white p-4 rounded-lg'>
        <h1 className='text-xl font-semibold mb-8'>Admission Form</h1>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-primary transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'>
                  <span className='text-sm font-medium text-primary'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
        <form className='pt-8' onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <div>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Personal Information
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Provide your personal details.
              </p>
              <div className='mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
                <div className='grid gap-1.5'>
                  <Label htmlFor='fullName'>Full name</Label>
                  <Input id='fullName' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select>
                    <SelectTrigger id='gender'>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='program'>Program Apply</Label>
                  <Select>
                    <SelectTrigger id='program'>
                      <SelectValue placeholder='Program' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='program1'>Program 1</SelectItem>
                      <SelectItem value='program2'>Program 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}>
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='motherName'>Mother Name</Label>
                  <Input id='motherName' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='religion'>Religion</Label>
                  <Input id='religion' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='fatherName'>Father Name</Label>
                  <Input id='fatherName' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='correspondenceAddress'>
                    Correspondence Address
                  </Label>
                  <Input id='correspondenceAddress' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='studentImage'>Student Image</Label>
                  <Input id='studentImage' type='file' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='nationality'>Nationality</Label>
                  <Input id='nationality' />
                </div>
                <div className='grid gap-1.5'>
                  <Label htmlFor='permanentAddress'>Permanent Address</Label>
                  <Input id='permanentAddress' />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Education
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Provide your previous education
              </p>

              <div className='mt-4 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div />
                <h2 className='font-semibold'>Name of School</h2>
                <h2 className='font-semibold'>Year</h2>
                <p>Elementary</p>
                <Input />
                <Input />
                <p>Secondary</p>
                <Input />
                <Input />
                <p>Undergraduate</p>
                <Input />
                <Input />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Upload Documents
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                Provide all necessary documents
              </p>
            </>
          )}
        </form>
        <div className='pt-4'>
          <div className='flex justify-between'>
            <Button
              type='button'
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((step) => step - 1)}>
              Back
            </Button>
            <Button
              type='button'
              onClick={() =>
                currentStep < steps.length - 1
                  ? setCurrentStep((step) => step + 1)
                  : null
              }>
              {currentStep === 2 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

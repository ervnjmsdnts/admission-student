'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { auth, db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string(),
    phoneNumber: z.string().min(11),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    type: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  });

type SchemaInputs = z.infer<typeof schema>;

export default function RegisterForm({ action }: { action: () => void }) {
  const form = useForm<SchemaInputs>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (data: SchemaInputs) => {
    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        role: 'user',
        createdAt: new Date().getTime(),
        isActive: true,
      });
      toast({ title: 'Successfully registered' });
      action();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const typeWatch = form.watch('type');

  const typeDetails: Record<string, string[]> = {
    new: [
      'Honorable Dismissal',
      'TOR (Photocopy)',
      'Gen. Weighted Average',
      'Birth Certificate',
      'Marriage Certificate (If married)',
      '2x2 ID Picture',
    ],
    returning: ['Fill out registration form', 'Payment/Down payment'],
    transferee: ['Refresh at least 9 units or 3 subjects'],
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'max-w-md w-full mt-8 bg-white p-4 rounded-lg',
          typeWatch && 'max-w-4xl',
        )}>
        <h3 className='text-center font-semibold text-lg'>
          Student Registration
        </h3>
        <div
          className={cn(
            'grid grid-cols-1 w-full mt-4',
            typeWatch && 'grid-cols-2 gap-x-4',
          )}>
          <div className='w-full'>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        onInput={(e) => {
                          const element = e.target as HTMLInputElement;
                          element.value = element.value.replace(
                            /[^a-zA-Z\s]/g,
                            '',
                          );
                          field.onChange(e);
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        onInput={(e) => {
                          const inputElement = e.target as HTMLInputElement;
                          let newValue = inputElement.value.replace(
                            /[^0-9]/g,
                            '',
                          );
                          if (newValue.length > 11) {
                            newValue = newValue.slice(0, 11);
                          }
                          inputElement.value = newValue;
                          field.onChange(e);
                        }}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select what type of student are you' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='new'>New</SelectItem>
                        <SelectItem value='returning'>Returning</SelectItem>
                        <SelectItem value='transferee'>Transferee</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-8'>
              <Button type='submit' disabled={isLoading} className='w-full'>
                {isLoading && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
                Register
              </Button>
            </div>
            <div className='text-sm mt-2 flex items-center justify-center gap-1'>
              <p>Already have an account?</p>
              <Button
                variant='link'
                type='button'
                onClick={action}
                className='p-0'>
                Login
              </Button>
            </div>
          </div>
          {typeWatch && (
            <div className='flex gap-4'>
              <Separator orientation='vertical' />
              <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-lg font-semibold text-center'>
                  Requirements
                </h3>
                <ul className='flex flex-col gap-4 list-disc'>
                  {typeDetails[typeWatch].map((item, index) => (
                    <li key={index} className='ml-4'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

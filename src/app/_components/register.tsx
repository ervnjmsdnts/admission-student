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
import { useToast } from '@/components/ui/use-toast';
import { auth, db } from '@/lib/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-white p-4 rounded-lg max-w-md w-full'>
        <h2 className='text-center text-xl font-semibold text-primary'>
          Online Admission System
        </h2>
        <div className='grid mt-4 gap-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
        </div>
        <div className='mt-8'>
          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
            Register
          </Button>
        </div>
        <div className='text-sm mt-2 flex items-center justify-center gap-1'>
          <p>Already have an account?</p>
          <Button variant='link' type='button' onClick={action} className='p-0'>
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}

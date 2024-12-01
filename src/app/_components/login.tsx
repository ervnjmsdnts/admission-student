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
import { User } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SchemaInputs = z.infer<typeof schema>;

export default function LoginForm({ action }: { action: () => void }) {
  const form = useForm<SchemaInputs>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (data: SchemaInputs) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const userDoc = doc(db, 'users', user.uid);

      const userDb = await getDoc(userDoc);

      const userData = userDb.data() as User;

      if (userData.role !== 'user') {
        throw new Error('User is not authorized');
      }

      const idToken = await user.getIdToken();

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const dbUserRef = doc(db, 'users', user.uid);

      const dbUser = await getDoc(dbUserRef);

      const dbUserData = dbUser.data() as User;

      const profile = {
        role: dbUserData.type,
        name: dbUserData.name,
        email: dbUserData.email,
      };

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('user_id', user.uid);

      router.push('/admission');
    } catch (error) {
      toast({ variant: 'destructive', title: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-white p-4 rounded-lg max-w-md w-full'>
        <div className='grid place-items-center gap-2'>
          <Image
            src='/mindoro-school-logo.png'
            width={100}
            height={100}
            alt='logo'
          />
          <h2 className='text-center text-xl font-semibold text-primary'>
            Online Admission System
          </h2>
        </div>
        <div className='grid mt-4 gap-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
        </div>
        <div className='mt-8'>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
            Login
          </Button>
        </div>
        <div className='text-sm mt-2 flex items-center justify-center gap-1'>
          <p>Don&apos;t have an account?</p>
          <Button type='button' onClick={action} variant='link' className='p-0'>
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}

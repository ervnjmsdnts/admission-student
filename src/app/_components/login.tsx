'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function LoginForm({ action }: { action: () => void }) {
  const router = useRouter();
  return (
    <form className='bg-white p-4 rounded-lg max-w-md w-full'>
      <h2 className='text-center text-xl font-semibold text-primary'>
        Online Admission System
      </h2>
      <div className='grid mt-4 gap-3'>
        <div className='grid gap-1.5'>
          <Label htmlFor='email'>Email Address</Label>
          <Input id='email' type='email' />
        </div>
        <div className='grid gap-1.5'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' />
        </div>
      </div>
      <div className='mt-8'>
        <Button
          type='button'
          onClick={() => router.push('/admission')}
          className='w-full'>
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
  );
}

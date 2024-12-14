'use client';

import { useState } from 'react';
import LoginForm from './_components/login';
import RegisterForm from './_components/register';
import Image from 'next/image';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const goToLogin = () => setIsLogin(true);
  const goToRegister = () => setIsLogin(false);

  return (
    <div className='bg-gray-100 h-full bg-[url("/background-school.jpg")] bg-cover bg-no-repeat'>
      <div className='fixed w-full h-full'>
        <div className='h-full w-full bg-white absolute opacity-70' />
      </div>
      <div className='flex flex-col items-center h-full justify-center relative z-10'>
        <div className='grid place-items-center gap-2'>
          <Image
            src='/mindoro-school-logo.png'
            width={100}
            height={100}
            alt='logo'
          />
          <h2 className='text-center text-2xl font-bold text-primary'>
            Divine World College of San Jose
          </h2>
          <h2 className='text-center text-2xl font-bold text-primary'>
            Enrollment System
          </h2>
        </div>
        {isLogin ? (
          <LoginForm action={goToRegister} />
        ) : (
          <RegisterForm action={goToLogin} />
        )}
      </div>
    </div>
  );
}

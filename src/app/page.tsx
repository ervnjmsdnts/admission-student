'use client';

import { useState } from 'react';
import LoginForm from './_components/login';
import RegisterForm from './_components/register';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const goToLogin = () => setIsLogin(true);
  const goToRegister = () => setIsLogin(false);

  return (
    <div className='bg-gray-100 h-full'>
      <div className='flex items-center h-full justify-center'>
        {isLogin ? (
          <LoginForm action={goToRegister} />
        ) : (
          <RegisterForm action={goToLogin} />
        )}
      </div>
    </div>
  );
}

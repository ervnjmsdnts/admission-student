import Navbar from '@/components/navbar';
import { PropsWithChildren } from 'react';

export default function AdmissionLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-full bg-gray-100 flex flex-col'>
      <Navbar />
      <main className='p-6 flex-grow'>{children}</main>
    </div>
  );
}

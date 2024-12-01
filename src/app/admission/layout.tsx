import Navbar from '@/components/navbar';
import { db } from '@/lib/firebase';
import { clientConfig, serverConfig } from '@/lib/firebase/config';
import { User } from '@/lib/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AdmissionLayout({ children }: PropsWithChildren) {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    return notFound();
  }

  const userDoc = doc(db, 'users', tokens.decodedToken.uid);

  const user = await getDoc(userDoc);

  const data = { ...user.data(), id: user.id } as User;

  const q = query(
    collection(db, 'admissions'),
    where('userId', '==', tokens.decodedToken.uid),
  );

  const admissions = await getDocs(q);

  const hasUserAdmission = !!admissions.docs[0].data();

  return (
    <div className='w-full h-full bg-gray-100 flex flex-col'>
      <Navbar user={data} hasAdmission={hasUserAdmission} />
      <main className='p-6 flex-grow'>{children}</main>
    </div>
  );
}

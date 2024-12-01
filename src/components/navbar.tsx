'use client';

import { Eye, Loader2, LogOut, Megaphone, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Notice, User } from '@/lib/types';
import { capitalFirstLetter } from '@/lib/utils';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { format } from 'date-fns';
import Image from 'next/image';

export default function Navbar({
  user,
  hasAdmission,
}: {
  user: User;
  hasAdmission: boolean;
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openNotices, setOpenNotices] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openProfileDialog = () => setOpenProfile(true);
  const openLogoutDialog = () => setOpenLogout(true);

  const handleLogout = async () => {
    await signOut(auth);

    await fetch('/api/logout');

    localStorage.removeItem('user_id');
    localStorage.removeItem('profile');

    window.location.reload();
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    (() => {
      const noticeQuery = query(
        collection(db, 'notices'),
        where('isActive', '==', true),
      );
      const unsub = onSnapshot(noticeQuery, (snapshot) => {
        const programs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        }) as Notice[];
        const sortedNotices = programs.sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        setNotices(sortedNotices);
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    })();
  }, []);

  return (
    <>
      <Dialog open={openNotices} onOpenChange={() => setOpenNotices(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Public Notices</DialogTitle>
          </DialogHeader>
          <div className=''>
            {notices.length === 0 ? (
              <p className='text-muted-foreground text-center'>
                No notices available
              </p>
            ) : (
              <div className='flex flex-col gap-4'>
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className='border p-2 grid gap-2 rounded-md max-h-52 overflow-y-auto'>
                    <div>
                      <h2 className='text-lg font-semibold'>{notice.title}</h2>
                      <p className='text-xs text-muted-foreground'>
                        {format(notice.createdAt, 'PPP')}
                      </p>
                    </div>
                    <p className='text-sm'>{notice.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openProfile} onOpenChange={() => setOpenProfile(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className='grid gap-2 mt-4'>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Name:</p>
              <p>{user.name}</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Password:</p>
              <div className='flex gap-2 items-center'>
                <p>{showPassword ? user.password : new Array(16).fill('*')}</p>
                <Button
                  onClick={handleShowPassword}
                  size='icon'
                  variant='link'
                  className='h-5 w-5'>
                  <Eye className='w-5 h-5' />
                </Button>
              </div>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Email Address:</p>
              <p>{user.email}</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Phone No.:</p>
              <p>{user.phoneNumber}</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Type:</p>
              <p>{capitalFirstLetter(user.type ?? '')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openLogout} onOpenChange={() => setOpenLogout(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <nav className='py-4 px-6 bg-primary text-white'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              className='bg-white rounded-full p-2'
              src='/mindoro-school-logo.png'
              alt='logo'
              width={50}
              height={50}
            />
            <h2>
              <span className='font-bold'>Hello!</span> {user.name}
            </h2>
          </div>
          <div className='flex items-center gap-4'>
            {hasAdmission && (
              <>
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <Button
                    onClick={() => setOpenNotices(true)}
                    size='icon'
                    className='relative border rounded-full'>
                    <Megaphone />
                    {notices.length > 0 && (
                      <>
                        <span className='animate-ping absolute inline-flex h-3 w-3 top-0 right-0 rounded-full bg-red-400 opacity-75'></span>
                        <span className='absolute inline-flex rounded-full h-3 w-3 top-0 right-0 bg-red-400'></span>
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className='text-black'>
                    {user.name.split(' ').map((name) => name[0])}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={openProfileDialog}>
                  <UserIcon className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openLogoutDialog}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}

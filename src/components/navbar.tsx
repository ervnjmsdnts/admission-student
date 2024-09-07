'use client';

import { Eye, LogOut, UserIcon } from 'lucide-react';
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
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from '@/lib/types';
import { capitalFirstLetter } from '@/lib/utils';

export default function Navbar({ user }: { user: User }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const openProfileDialog = () => setOpenProfile(true);
  const openLogoutDialog = () => setOpenLogout(true);

  const handleLogout = async () => {
    await signOut(auth);

    await fetch('/api/logout');

    localStorage.removeItem('user_id');

    router.replace('/');
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
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
          <h2>
            <span className='font-bold'>Hello!</span> {user.name}
          </h2>
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
      </nav>
    </>
  );
}

'use client';

import { Eye, LogOut, Pencil, User } from 'lucide-react';
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

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const router = useRouter();

  const openProfileDialog = () => setOpenProfile(true);
  const openLogoutDialog = () => setOpenLogout(true);

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
              <p>John Doe</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Password:</p>
              <div className='flex gap-2 items-center'>
                <p>************</p>
                <Button size='icon' variant='link' className='h-5 w-5'>
                  <Eye className='w-5 h-5' />
                </Button>
              </div>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Email Address:</p>
              <p>johndoe@gmail.com</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-medium'>Mobile No.:</p>
              <p>09123456789</p>
            </div>
          </div>
          <Button type='button' className='justify-self-end mt-8'>
            <Pencil className='mr-2 h-4 w-4' />
            <p>Edit</p>
          </Button>
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
            <Button onClick={() => router.push('/')}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <nav className='py-4 px-6 bg-primary text-white'>
        <div className='flex items-center justify-between'>
          <h2>Hello John Doe</h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback className='text-black'>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={openProfileDialog}>
                <User className='mr-2 h-4 w-4' />
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

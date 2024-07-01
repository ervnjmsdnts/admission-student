import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';
import Link from 'next/link';

export default function AdmissionPage() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex items-center flex-col gap-4'>
        <Ban className='text-red-400 h-10 w-10' />
        <div className='text-center text-sm text-muted-foreground'>
          <p>You have not applied for admission.</p>
          <p>Please fill the admission form.</p>
        </div>
        <Button asChild>
          <Link href='admission/form'>Apply for admission</Link>
        </Button>
      </div>
    </div>
  );
}

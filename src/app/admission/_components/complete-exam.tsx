import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { Admission } from '@/lib/types';
import { doc, updateDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CompleteExam({
  open,
  onClose,
  admission,
}: {
  open: boolean;
  onClose: () => void;
  admission: Admission;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const completeExam = async () => {
    const docRef = doc(db, 'admissions', `${admission.id}`);
    try {
      setIsLoading(true);
      await updateDoc(docRef, {
        status: 'completeExamination',
        examination: {
          ...admission.examination,
          completeExamDate: new Date().getTime(),
        },
      });
      toast({
        title:
          'Successfully marked examination as complete. Please wait while we are reviewing your examination.',
      });
      onClose();
    } catch (error) {
      toast({
        title: `Marking examination as complete failed`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Examination</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' disabled={isLoading} variant='secondary'>
                Close
              </Button>
            </DialogClose>
            <Button onClick={completeExam} disabled={isLoading}>
              {isLoading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
              Mark as Complete
            </Button>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

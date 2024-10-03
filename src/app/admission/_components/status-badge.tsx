import { Badge } from '@/components/ui/badge';

export default function StatusBadge({
  status,
}: {
  status:
    | 'forReview'
    | 'rejected'
    | 'approved'
    | 'onGoingExamination'
    | 'completeExamination';
}) {
  if (status === 'forReview')
    return <Badge className='bg-blue-400 hover:bg-blue-500'>For Review</Badge>;
  else if (status === 'rejected')
    return <Badge variant='destructive'>Rejected</Badge>;
  else if (status === 'onGoingExamination')
    return <Badge variant='onGoing'>On Going Exam</Badge>;
  else if (status === 'completeExamination')
    return <Badge variant='complete'>Exam Complete</Badge>;
  else return <Badge>Approved</Badge>;
}

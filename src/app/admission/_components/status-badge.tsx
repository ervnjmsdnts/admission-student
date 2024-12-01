import { Badge } from '@/components/ui/badge';

export default function StatusBadge({
  status,
}: {
  status:
    | 'forReview'
    | 'rejected'
    | 'approved'
    | 'onGoingExamination'
    | 'completeExamination'
    | 'approvedExamination'
    | 'rejectedExamination';
}) {
  if (status === 'forReview')
    return <Badge className='bg-blue-400 hover:bg-blue-500'>For Review</Badge>;
  else if (status === 'rejected')
    return <Badge variant='destructive'>Rejected</Badge>;
  else if (status === 'onGoingExamination')
    return <Badge variant='onGoing'>Schedule of Examination</Badge>;
  else if (status === 'approvedExamination')
    return <Badge>Approved Examination</Badge>;
  else if (status === 'rejectedExamination')
    return <Badge variant='destructive'>Rejected Examination</Badge>;
  else if (status === 'completeExamination')
    return <Badge variant='complete'>Exam Complete</Badge>;
  else return <Badge>Approved</Badge>;
}

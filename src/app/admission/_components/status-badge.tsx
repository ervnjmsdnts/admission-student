import { Badge } from '@/components/ui/badge';

export default function StatusBadge({
  status,
}: {
  status: 'forReview' | 'rejected' | 'approved';
}) {
  if (status === 'forReview')
    return <Badge className='bg-blue-400 hover:bg-blue-500'>For Review</Badge>;
  else if (status === 'rejected')
    return <Badge variant='destructive'>Rejected</Badge>;
  else return <Badge>Approved</Badge>;
}

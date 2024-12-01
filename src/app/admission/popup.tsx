import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const steps = [
  { text: 'Present first all credentials needed', role: 'all' },
  { text: 'Evaluation of TOR et al.', role: 'all' },
  { text: 'Entrance Exam', role: 'all' },
  { text: 'Fill up Registration Form', role: 'old' },
  { text: 'Assigning of Subjects', role: 'old' },
  {
    text: 'Proceed to the Registration Office (For Encoding of Subjects)',
    role: 'old',
  },
  { text: 'Finance Office (Downpayment/Full Payment)', role: 'old' },
  { text: 'Back to Graduation School Office for the assessment', role: 'old' },
];

export default function Popup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const user = JSON.parse(localStorage.getItem('profile') ?? '');

  const TEXTS = useMemo(() => {
    if (!user) return steps;

    const oldTexts = steps.filter((step) => step.role === 'old');

    if (user.type === 'returning') return oldTexts;

    return steps;
  }, [user]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='h-[700px]'>
        <div className='h-full flex flex-col'>
          <Carousel setApi={setApi} className='h-full'>
            <Image
              src='/mindoro-school-logo.png'
              className='fixed opacity-5 -z-10 top-1/2 -translate-y-1/2 -left-12 translate-x-1/2'
              alt='logo'
              width={300}
              height={300}
            />
            <CarouselContent className='h-full'>
              <CarouselItem className='flex w-[50px] items-center justify-center flex-col h-full gap-4'>
                <div className=''>
                  <h2 className='text-center font-semibold text-primary text-lg'>
                    Vision
                  </h2>
                  <p className='text-center font-medium'>
                    The Divine Word College of San Jose, a premier Catholic
                    institution in Occidental Mindoro rooted in the Holy Triune
                    God, is dedicated to the holistic development of the person.
                  </p>
                </div>
                <div className=''>
                  <h2 className='text-center font-semibold text-primary text-lg'>
                    Mission
                  </h2>
                  <p className='text-center font-medium'>
                    To provide Christian quality education that promotes
                    cultural sensitivity and global competence.
                  </p>
                </div>
                <div className=''>
                  <h2 className='text-center font-semibold text-primary text-lg'>
                    Goal
                  </h2>
                  <p className='text-center font-medium'>
                    To attain level one accreditation for basic education and
                    college programs.
                  </p>
                </div>
                <div className='font-medium'>
                  <h2 className='text-center font-semibold text-primary text-lg'>
                    Core Values
                  </h2>
                  <p className='text-center'>Integrity</p>
                  <p className='text-center'>Service</p>
                  <p className='text-center'>Competence</p>
                </div>
              </CarouselItem>
              <CarouselItem className='px-16 max-h-[600px] overflow-y-auto relative image'>
                <div className='grid relative z-10 gap-4 text-sm text-justify'>
                  <h1 className='font-semibold text-primary'>
                    Academic Policies and Regulations
                  </h1>
                  <h2 className='font-semibold'>1. Admission Requirements</h2>
                  <p>
                    For admission into the master&apos;s program only those
                    students who graduated in the baccalaureate degree program
                    with at least an average rating of 85% or 2 in the entire
                    course shall be considered eligible. However, by way of
                    exception, students with a lower general average than the
                    prescribed admission qualifications may initially be
                    admitted after signing the contract or agreement, that
                    &quot;inspite of this deficiency, we may still admit you in
                    our graduate program provided you to comply with the
                    following requirement:
                  </p>
                  <p>
                    On your first 18 units under the Graduate School program
                    your general average must be at least 2.0% or 85% otherwise
                    you will just earn units and will not graduate as MA, MAED,
                    MASED or MBA&quot;. After satisfactory compliance with
                    prescribed admission criteria may formally be admitted to
                    the degree program upon recommendation of the Graduate
                    School Administrative Assistant and approval by the Dean.
                  </p>
                  <p>
                    In certain specific fields of concentration, graduate
                    students should have had the proper and corresponding
                    undergraduate academic backgrounds or 12 units in the same
                    graduate major being applied for at either undergraduate or
                    graduate level before being admitted formally into the
                    graduate degree program.
                  </p>
                  <p>
                    Application for admission to the Graduate School should be
                    filed with the Graduate School Administrative
                    Assistant&apos;s Office as early as possible. All the
                    necessary credentials for admission must be submitted during
                    the enrollment period.
                  </p>
                  <p>
                    Each application should be accompanied by an official
                    transcript of undergraduate records for evaluation purposes,
                    Honorable dismissal from the last school attended, Birth
                    Certificate or Marriage certificate for Married woman for
                    the correct spelling of their name and (2) 2x2 ID Pictures.
                  </p>
                  <p>
                    The Graduate School Administrative Asst./Dean evaluates the
                    student for admission.
                  </p>
                  <h2 className='font-semibold'>2. Degree Requirements</h2>
                  <p>
                    The Graduate School program includes basic and major
                    subjects in the field of specialization. The total number of
                    units required for a Master&apos;s degree is 36 units
                    distributed as follows:
                  </p>
                  <div className='grid grid-cols-2'>
                    <p>Basic</p>
                    <p className='text-right'>9 Units</p>
                    <p>Major</p>
                    <p className='text-right'>15 Units</p>
                    <p>Elective</p>
                    <p className='text-right'>6 Units</p>
                    <p>Institutional Requirements</p>
                    <p className='text-right'>3 Units</p>
                    <p>Thesis</p>
                    <p className='text-right'>6 Units</p>
                    <p>Total</p>
                    <p className='text-right'>39 Units</p>
                  </div>
                  <p>
                    As a general rule, a candidate for the graduate degree must
                    be enrolled for at least four semesters or summer terms.
                  </p>
                  <p>
                    A thesis is required for the M.A., MAED, and MASED program.
                    However, in the M.B.A. program, thesis writing is optional.
                    The students who opt for non-thesis Master&apos;s program
                    are obliged to comply with the following requirements:
                  </p>
                  <p>enroll additional 6 units in lieu of thesis writing</p>
                  <p>
                    Feasibility study with comprehensive exam and oral defense.
                  </p>
                  <h2 className='font-semibold'>3. Withdrawal</h2>
                  <h2 className='font-semibold'>
                    4. Grades, Failure, Termination of Candidacy and dismissal
                  </h2>
                  <p>Graduate students are graded as follows:</p>
                  <div className='grid grid-cols-2'>
                    <p>1.0 - 95-10</p>
                    <p>1.6 - 89</p>
                    <p>1.1 - 94</p>
                    <p>1.7 - 88</p>
                    <p>1.2 - 93</p>
                    <p>1.8 - 87</p>
                    <p>1.3 - 92</p>
                    <p>1.9 - 86</p>
                    <p>1.4 - 91</p>
                    <p>2.0 - 85</p>
                    <p>1.5 - 90</p>
                    <p>below 2.0 No grade Credit</p>
                  </div>
                  <p>
                    Incomplete - The work of the student is incomplete owing to
                    failure to take the final examination or to submit required
                    reports or term paper, etc. A student who receives a grade
                    of &quot;Inc&quot; is required to take the necessary steps
                    to change such a grade within the deadline set by the
                    professor or within two semester after the &quot;Inc.&quot;
                    has been obtained. Failure to do so within the specified
                    time limit will automatically revert it to a grade of 5.0
                    (failure).
                  </p>
                  <p>
                    The passing grade of &quot;2.0&quot; applies both to
                    academic grades and to the written Comprehensive
                    Examination. A student who receives a grade below
                    &quot;2.0&quot; in a required subject, must repeat the
                    subject satisfactorily (with at least a grade of
                    &quot;2.0&quot;; if the subject happens to be an elective,
                    he must repeat the subject or substitute it with another.
                  </p>
                  <p>
                    Failure in two subjects disqualifies a student to earn the
                    degree.
                  </p>
                  <p>
                    A student who fails the written comprehensive examination is
                    allowed to &quot;re-take&quot; only. Failure in the
                    &quot;re-take&quot; means automatic termination of a
                    candidacy for the degree.
                  </p>
                  <p>
                    A student who fails the Thesis Defense may take a
                    &quot;re-take However, a consensus of 2/3 vote of the Panel
                    is required. With a failure in the &quot;re-oral&quot;,
                    candidacy ends.
                  </p>
                  <p>
                    Other reasons for dismissal are: cheating; falsification of
                    academic records; plagiarism; and criminal acts against the
                    institution.
                  </p>
                  <p>
                    After finishing the required number of units or academic
                    requirements completed-CARMA, a graduate student/s should
                    finished his program and submit thesis within five years.
                    Otherwise, he will have to enroll in nine units (major) for
                    reinstatement
                  </p>
                  <h2 className='font-semibold'>
                    5. Transfer of Credits and Cross-enrolment
                  </h2>
                  <p>
                    Transfer from one graduate school to another is discouraged.
                    However, in exceptional cases where a transfer is
                    unavoidable all the academic units earned by the students
                    from the school last attended, excluding thesis units, may
                    be accepted by the school subject to the following
                    conditions:
                  </p>
                  <p>
                    The subjects taken in the school last attended are
                    substantially in the same content in the graduate curriculum
                    of the college. 5.2 The residence requirement shall have
                    been complied with.
                  </p>
                  <p>Approval of the Dean.</p>
                  <h2 className='font-semibold'>Unit Loads</h2>
                  <p>
                    Regular and Working Graduate Students As per MECS Order No.
                    33, series of 1985, the maximum unit load of graduate
                    students in the regular semestral terms and in the summer,
                    sessions will be as follows:
                  </p>
                  <div className='grid grid-cols-2'>
                    <p>Regular Students</p>
                    <p className='text-right'>12 Units</p>
                    <p>Working Students</p>
                    <p className='text-right'>9 Units</p>
                  </div>
                  <p>
                    The Graduate School Administrative Asst. or Dean of Graduate
                    School, however, has the discretion to limit the load of
                    certain students based on their capabilities, or to allow
                    highly exceptional students to carry three more units beyond
                    the maximum load subject.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className='w-[50px] px-16 flex items-center justify-center'>
                <div className='grid gap-4'>
                  <h2 className='font-semibold text-primary'>
                    Step by Step for Graduate-School Admission
                  </h2>
                  {TEXTS.map((item, index) => (
                    <p key={index}>
                      {index + 1}. {item.text}
                    </p>
                  ))}
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className='text-center text-sm text-muted-foreground'>
            {current} of {count}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

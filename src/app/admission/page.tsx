'use client';

import { Button } from '@/components/ui/button';
import { Ban, CircleCheck, Loader2, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Admission, Examination } from '@/lib/types';
import { format } from 'date-fns';
import StatusBadge from './_components/status-badge';
import { capitalFirstLetter } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CompleteExam from './_components/complete-exam';

export default function AdmissionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [admission, setAdmission] = useState<Admission>({} as Admission);
  const [examination, setExamination] = useState<Examination>(
    {} as Examination,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch admissions first
    const fetchAdmissions = () => {
      const q = query(
        collection(db, 'admissions'),
        where('userId', '==', localStorage.getItem('user_id')),
      );

      const unsubAdmissions = onSnapshot(q, (snapshot) => {
        const admissions = snapshot.docs.map((doc) => {
          const data = doc.data() as Admission;
          return { ...data, id: doc.id };
        });

        const currentAdmission = admissions[0] ?? {};
        setAdmission(currentAdmission);
        setIsLoading(false);

        // Once admission is set, fetch examination if it exists
        console.log({ admission: currentAdmission });
        if (currentAdmission.examination) {
          const fetchExam = () => {
            const qExam = doc(
              db,
              'examinations',
              currentAdmission.examination!.examForm,
            );

            const unsubExam = onSnapshot(qExam, (snapshot) => {
              const examination = {
                ...snapshot.data(),
                id: snapshot.id,
              } as Examination;

              setExamination(examination ?? {});
              setIsLoading(false);
            });

            return unsubExam;
          };

          const unsubExamination = fetchExam();

          // Return function to unsubscribe from both listeners
          return () => {
            unsubAdmissions();
            unsubExamination();
          };
        }
      });

      return unsubAdmissions;
    };

    const unsubscribe = fetchAdmissions();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <CompleteExam
        open={isOpen}
        onClose={() => setIsOpen(false)}
        admission={admission}
      />
      <div className='flex items-center justify-center h-full'>
        {isLoading ? (
          <Loader2 className='w-8 h-8 animate-spin' />
        ) : (
          <div className='container h-full'>
            {Object.keys(admission).length === 0 ? (
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
            ) : (
              <div className='flex flex-col gap-4 h-full'>
                <div className='flex flex-col h-full'>
                  <div className='p-8 border bg-white rounded-lg grid gap-6 h-0 overflow-y-auto flex-grow'>
                    <div className='flex justify-between items-center'>
                      <h1 className='font-semibold text-2xl text-primary'>
                        Admission
                      </h1>
                      <StatusBadge status={admission.status} />
                    </div>
                    <div className='grid gap-3 text-sm [&>div]:border-b'>
                      <h2 className='text-base font-semibold text-primary'>
                        Profile
                      </h2>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Name</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.name.family},</p>
                          <p>{admission.form.name.first}</p>
                          <p>{admission.form.name.middle}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Permanent Address</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.permanentAddress.town},</p>
                          <p>{admission.form.permanentAddress.province}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Civil Status</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(admission.form.civilStatus)}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Date of Birth</h3>
                        <div className='flex gap-1'>
                          <p>
                            {format(
                              new Date(admission.form.dateOfBirth),
                              'PPP',
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Place of Birth</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.placeOfBirth}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Religion</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.religion.name}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Baptized?</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(
                              admission.form.religion.baptized,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Confirmed?</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(
                              admission.form.religion.baptized,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Married?</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(
                              admission.form.married.isMarried,
                            )}
                          </p>
                        </div>
                      </div>
                      {admission.form.married.isMarried === 'yes' && (
                        <div className='flex justify-between items-center'>
                          <h3 className='font-medium'>Ceremony Held</h3>
                          <div className='flex gap-1'>
                            <p>
                              {admission.form.married.ceremony.map((cr) =>
                                capitalFirstLetter(cr),
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='grid gap-3 text-sm [&>div]:border-b'>
                      <h2 className='text-base font-semibold text-primary'>
                        Education
                      </h2>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Elementary</h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.previousEducation.elementary.name},
                          </p>
                          <p>
                            {admission.form.previousEducation.elementary.town},
                          </p>
                          <p>
                            {
                              admission.form.previousEducation.elementary
                                .province
                            }
                            ,
                          </p>
                          <p>
                            {admission.form.previousEducation.elementary.year}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Secondary</h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.previousEducation.secondary.name},
                          </p>
                          <p>
                            {admission.form.previousEducation.secondary.town},
                          </p>
                          <p>
                            {
                              admission.form.previousEducation.secondary
                                .province
                            }
                            ,
                          </p>
                          <p>
                            {admission.form.previousEducation.secondary.year}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Collegiate</h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.previousEducation.collegiate.name},
                          </p>
                          <p>
                            {admission.form.previousEducation.collegiate.town},
                          </p>
                          <p>
                            {
                              admission.form.previousEducation.collegiate
                                .province
                            }
                            ,
                          </p>
                          <p>
                            {admission.form.previousEducation.collegiate.year}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Graduate</h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.previousEducation.graduate.name},
                          </p>
                          <p>
                            {admission.form.previousEducation.graduate.town},
                          </p>
                          <p>
                            {admission.form.previousEducation.graduate.province}
                            ,
                          </p>
                          <p>
                            {admission.form.previousEducation.graduate.year}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Academic Honors</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.academicHonors || 'N/A'}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          Extra-Curricular Activities
                        </h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.extraCurricularActivities || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          Membership in Professional Organization
                        </h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.memberInProfessionalOrg
                              ? capitalFirstLetter(
                                  admission.form.memberInProfessionalOrg,
                                )
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          Over-All Undergraduate Average Grade
                        </h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.underGraduateGrade}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          Over-All Grade in Major Subjects
                        </h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.gradeInMajorSubjects}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Graduate Status Desired</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(
                              admission.form.degree.status === 'nonDegree'
                                ? 'Non-degree'
                                : admission.form.degree.status,
                            )}
                          </p>
                        </div>
                      </div>
                      {admission.form.degree.status === 'degree' && (
                        <div className='flex justify-between items-center'>
                          <h3 className='font-medium'>Major Degree</h3>
                          <div className='flex gap-1'>
                            <p>
                              {capitalFirstLetter(
                                admission.form.degree.desiredDegree,
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Major Field Units</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.majorFieldUnits}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Minor Field Units</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.minorFieldUnits}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Minor Field Units</h3>
                        <div className='flex gap-1'>
                          <p>{admission.form.minorFieldUnits}</p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Full-time Student?</h3>
                        <div className='flex gap-1'>
                          <p>
                            {capitalFirstLetter(
                              admission.form.isFullTimeStudent,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          Present Employed Position
                        </h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.presentPosition
                              ? capitalFirstLetter(
                                  admission.form.presentPosition,
                                )
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Subject Taught</h3>
                        <div className='flex gap-1'>
                          <p>
                            {admission.form.subjectTaught
                              ? capitalFirstLetter(admission.form.subjectTaught)
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {admission.form.references.length > 0 && (
                      <div className='grid gap-3 text-sm [&>div]:border-b'>
                        <h2 className='text-base font-semibold text-primary'>
                          References
                        </h2>
                        {new Array(10).fill('').map((_, index) => (
                          <div key={index}>
                            <div className='flex items-center justify-between'>
                              <p className='font-medium'>Name</p>
                              <p>Test Name</p>
                            </div>
                            <div className='flex items-center justify-between'>
                              <p className='font-medium'>Address</p>
                              <p>Test Address</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className='grid gap-3 text-sm [&>div]:border-b'>
                      <h2 className='text-base font-semibold text-primary'>
                        Documents
                      </h2>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Honorable Dismissal</h3>
                        <div className='flex gap-1'>
                          <Button className='p-0' asChild variant='link'>
                            <a
                              target='_blank'
                              href={
                                admission.form.documents.honorableDismissal
                              }>
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          TOR (Transcript of Record)
                        </h3>
                        <div className='flex gap-1'>
                          <Button className='p-0' asChild variant='link'>
                            <a
                              target='_blank'
                              href={admission.form.documents.tor}>
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>
                          General Weighted Average
                        </h3>
                        <div className='flex gap-1'>
                          <Button className='p-0' asChild variant='link'>
                            <a
                              target='_blank'
                              href={
                                admission.form.documents.generalWeightedAverage
                              }>
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Birth Certificate</h3>
                        <div className='flex gap-1'>
                          <Button className='p-0' asChild variant='link'>
                            <a
                              target='_blank'
                              href={admission.form.documents.birthCertificate}>
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>Marriage Certificate</h3>
                        <div className='flex gap-1'>
                          {admission.form.documents.marriageCertificate ? (
                            <Button className='p-0' asChild variant='link'>
                              <a
                                target='_blank'
                                href={
                                  admission.form.documents.marriageCertificate
                                }>
                                View
                              </a>
                            </Button>
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>2x2 ID Picture</h3>
                        <div className='flex gap-1'>
                          <Button className='p-0' asChild variant='link'>
                            <a
                              target='_blank'
                              href={admission.form.documents.idPicture}>
                              View
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Examination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {admission.examination ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Schedule</TableHead>
                            <TableHead></TableHead>
                            <TableHead className='text-center'>
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {admission.examination.scheduleDate
                                ? format(
                                    admission.examination.scheduleDate,
                                    'PPp',
                                  )
                                : ''}
                            </TableCell>
                            <TableCell>
                              <Button asChild variant='link' className='p-0'>
                                <Link
                                  target='_blank'
                                  href={examination.link ?? ''}>
                                  <SquareArrowOutUpRight className='h-4 w-4 mr-2' />
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                            <TableCell className='text-center'>
                              <Button
                                disabled={
                                  admission.status === 'completeExamination'
                                }
                                onClick={() => setIsOpen(true)}
                                size='icon'
                                className='rounded-full'>
                                <CircleCheck />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <p className='text-center text-muted-foreground'>
                        No examination scheduled
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

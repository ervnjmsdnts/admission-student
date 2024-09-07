import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '../schema';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Program = {
  id: string;
  name: string;
  createdAt: number;
};

export default function FormEducation({
  form,
}: {
  form: UseFormReturn<Inputs>;
}) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const desiredStatus = form.watch('degree.status');

  useEffect(() => {
    (() => {
      const programsQuery = query(
        collection(db, 'programs'),
        where('isActive', '==', true),
      );
      const unsub = onSnapshot(programsQuery, (snapshot) => {
        const programs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        }) as Program[];
        const sortedPrograms = programs.sort(
          (a, b) => b.createdAt - a.createdAt,
        );
        setPrograms(sortedPrograms);
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    })();
  }, []);

  return (
    <div>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Education
      </h2>
      <div className='pt-4 grid grid-cols-5 gap-x-6 gap-y-4'>
        <div />
        <h2 className={cn('font-semibold')}>Name of School</h2>
        <h2 className='font-semibold'>Town</h2>
        <h2 className='font-semibold'>Province</h2>
        <h2 className='font-semibold'>Year</h2>
        <p>Elementary</p>
        <FormField
          control={form.control}
          name='previousEducation.elementary.name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.elementary.town'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.elementary.province'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.elementary.year'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <p>Secondary</p>
        <FormField
          control={form.control}
          name='previousEducation.secondary.name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.secondary.town'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.secondary.province'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.secondary.year'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <p>Collegiate</p>
        <FormField
          control={form.control}
          name='previousEducation.collegiate.name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.collegiate.town'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.collegiate.province'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.collegiate.year'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <p>Graduate</p>
        <FormField
          control={form.control}
          name='previousEducation.graduate.name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.graduate.town'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.graduate.province'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='previousEducation.graduate.year'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className='grid pt-4 grid-cols-2 gap-x-6 gap-y-4'>
        <FormField
          control={form.control}
          name='academicHonors'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Honors</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='extraCurricularActivities'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra-Curricular Activities</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='memberInProfessionalOrg'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership in Professional Organization</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <div className='grid grid-cols-2 gap-x-6'>
            <FormField
              control={form.control}
              name='underGraduateGrade'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Over-All Undergraduate Average Grade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gradeInMajorSubjects'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Over-All Grade in Major Subjects</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            'flex items-center self-start gap-2',
            desiredStatus === 'degree' ? 'col-span-1' : 'col-span-2',
          )}>
          <FormField
            control={form.control}
            name='degree.status'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Graduate Status Desired</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='flex items-center gap-2'
                    defaultValue={field.value}>
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>Auditor</FormLabel>
                      <FormControl>
                        <RadioGroupItem value='auditor' />
                      </FormControl>
                    </FormItem>
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>Non-degree</FormLabel>
                      <FormControl>
                        <RadioGroupItem value='nonDegree' />
                      </FormControl>
                    </FormItem>
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <RadioGroupItem value='degree' />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {desiredStatus === 'degree' && (
          <FormField
            control={form.control}
            name='degree.desiredDegree'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What will your major be?</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading} ref={field.ref}>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.name}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
        <div className='col-span-2'>
          <h2 className='font-medium'>
            How many undergraduate college units have you chosen in
          </h2>
          <div className='grid gap-x-6 grid-cols-2'>
            <FormField
              control={form.control}
              name='majorFieldUnits'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major Field</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='minorFieldUnits'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minor Field</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='col-span-2 flex gap-2'>
          <FormField
            control={form.control}
            name='isFullTimeStudent'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Will you be a full-time student</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='flex items-center gap-2'
                    defaultValue={field.value}>
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>Yes</FormLabel>
                      <FormControl>
                        <RadioGroupItem value='yes' />
                      </FormControl>
                    </FormItem>
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>No</FormLabel>
                      <FormControl>
                        <RadioGroupItem value='no' />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='presentPosition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>If employed, state your present position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subjectTaught'
          render={({ field }) => (
            <FormItem>
              <FormLabel>If you teach, state the subject you taught</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

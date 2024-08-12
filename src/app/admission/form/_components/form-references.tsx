import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Inputs } from '../schema';
import { Fragment } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

export default function FormReferences({
  form,
}: {
  form: UseFormReturn<Inputs>;
}) {
  const { append, remove, fields } = useFieldArray({
    name: 'references',
    control: form.control,
  });

  console.log(form.formState.errors);
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        References
      </h2>
      <div className='grid gap-x-6 gap-y-4 grid-cols-2'>
        <h2 className=' font-medium'>Name</h2>
        <h2 className=' font-medium'>Address</h2>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <FormField
              control={form.control}
              name={`references.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex items-center gap-1 w-full'>
              <FormField
                control={form.control}
                name={`references.${index}.address`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant='destructive'
                type='button'
                onClick={() => remove(index)}>
                <X className='w-4 h-4' />
              </Button>
            </div>
          </Fragment>
        ))}
      </div>
      <Button
        className='self-end'
        type='button'
        onClick={() => append({ name: '', address: '' })}>
        Add Reference
      </Button>
    </div>
  );
}

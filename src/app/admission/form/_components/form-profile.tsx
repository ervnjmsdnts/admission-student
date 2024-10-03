import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '../schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarPicker } from '@/components/ui/calendar-picker';

const ceremonyItems = [
  {
    id: 'catholic',
    label: 'Was your ceremony Catholic?',
  },
  {
    id: 'nonCatholic',
    label: 'Was your ceremony Non Catholic?',
  },
  {
    id: 'civil',
    label: 'Was your ceremony Civil?',
  },
] as const;

export default function FormProfile({ form }: { form: UseFormReturn<Inputs> }) {
  const isMarried = form.watch('married.isMarried');
  return (
    <div>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Personal Information
      </h2>
      <p className='pt-1 text-sm leading-6 text-gray-600'>
        Provide your personal details.
      </p>
      <div className='pt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'>
        <div className='grid col-span-2 w-full gap-1.5'>
          <h2 className='font-medium'>Name</h2>
          <div className='grid w-full grid-cols-3 gap-x-6'>
            <FormField
              control={form.control}
              name='name.family'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name.first'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name.middle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='col-span-2 grid gap-1.5'>
          <h2 className='font-medium'>Permanent Address</h2>
          <div className='grid gap-x-6 grid-cols-3'>
            <FormField
              control={form.control}
              name='permanentAddress.town'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='permanentAddress.province'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='civilStatus'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Civil Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger ref={field.ref} id='civilStatus'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='married'>Married</SelectItem>
                      <SelectItem value='single'>Single</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem className='grid gap-1.5'>
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <CalendarPicker
                    mode='single'
                    captionLayout='dropdown-buttons'
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    fromYear={1960}
                    toYear={2024}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='placeOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place of Birth</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='col-span-2 grid gap-x-6 grid-cols-2'>
          <FormField
            control={form.control}
            name='religion.name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex items-center gap-6'>
            <FormField
              control={form.control}
              name='religion.baptized'
              render={({ field }) => (
                <FormItem className='flex items-center gap-2'>
                  <FormLabel>Baptized?</FormLabel>
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
            <FormField
              control={form.control}
              name='religion.confirmed'
              render={({ field }) => (
                <FormItem className='flex items-center gap-2'>
                  <FormLabel>Confirmed?</FormLabel>
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
        </div>
        <div className='col-span-2 flex items-center gap-2'>
          <FormField
            control={form.control}
            name='married.isMarried'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2'>
                <FormLabel>Are you married?</FormLabel>
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
        {isMarried === 'yes' && (
          <div className='col-span-2 grid gap-1.5'>
            {ceremonyItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name='married.ceremony'
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className='flex flex-row items-start space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field?.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

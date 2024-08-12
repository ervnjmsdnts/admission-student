import { UseFormReturn } from 'react-hook-form';
import { Inputs } from '../schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function FormUploadDocuments({
  form,
}: {
  form: UseFormReturn<Inputs>;
}) {
  return (
    <div>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Upload Documents
      </h2>
      <p className='pt-1 text-sm leading-6 text-gray-600'>
        Provide all necessary documents
      </p>
      <div className='pt-4 grid gap-y-4 max-w-lg'>
        <FormField
          control={form.control}
          name='documents.honorableDismissal'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Honorable Dismissal</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documents.tor'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>TOR (Transcript of Records)</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documents.generalWeightedAverage'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>General Weighted Average</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documents.birthCertificate'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Birth Certificate</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documents.marriageCertificate'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Marriage Certificate (If married)</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='documents.idPicture'
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>2x2 ID Picture</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

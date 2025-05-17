import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveButton } from '@/components/ui/save-button';
import { Textarea } from '@/components/ui/textarea';
import type { UseToolsQuery } from '@/queries/tools/use-tools-query';

const formSchema = z.object({
  name: z.string(),
  serial_code: z.string(),
  brand: z.string(),
  accuracy: z.string(),
  range: z.string(),
  serial_number: z.string(),
  property_code: z.string(),
  quantity: z.string(),
  description: z.string(),
});

const ToolForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: UseToolsQuery.Tool; disabled?: boolean }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (_values: z.infer<typeof formSchema>) => {
    console.log(_values);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader className="border-b">{title}</CardHeader>

          <CardContent className="py-6">
            <FormField
              name="name"
              disabled={disabled}
              defaultValue={values?.name ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Tool name" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="serial_code"
              disabled={disabled}
              defaultValue={values?.serial_code ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Serial Code</FormLabel>

                  <FormControl>
                    <Input placeholder="Serial Code" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="brand"
              disabled={disabled}
              defaultValue={values?.brand ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Brand</FormLabel>

                  <FormControl>
                    <Input placeholder="Brand" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="accuracy"
              disabled={disabled}
              defaultValue={values?.accuracy ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Accuracy</FormLabel>

                  <FormControl>
                    <Input placeholder="Accuracy" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="range"
              disabled={disabled}
              defaultValue={values?.range ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Range</FormLabel>

                  <FormControl>
                    <Input placeholder="Range" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="serial_number"
              disabled={disabled}
              defaultValue={values?.serial_number ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Serial Number</FormLabel>

                  <FormControl>
                    <Input placeholder="Serial Number" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="property_code"
              disabled={disabled}
              defaultValue={values?.property_code ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Property Code</FormLabel>

                  <FormControl>
                    <Input placeholder="Property Code" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="quantity"
              disabled={disabled}
              defaultValue={(values?.quantity ?? 0).toString()}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Quantity</FormLabel>

                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              disabled={disabled}
              defaultValue={values?.description ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
          </CardContent>

          {disabled ? null : (
            <CardFooter className="border-t">
              <SaveButton />
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default ToolForm;

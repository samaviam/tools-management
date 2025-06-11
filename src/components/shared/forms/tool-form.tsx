import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Tool } from '@/types';
import db from '@/db';
import { tools } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

const ToolForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: Tool.Item.Type; disabled?: boolean }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(
      Tool.Item.zod.omit({
        id: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      }),
    ),
  });

  const handleSubmit = async (
    _values: Omit<
      Tool.Item.Type,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ) => {
    if (values) {
      // UPDATE
      await db
        .update(tools)
        .set(_values)
        .where(eq(tools.id, values.id))
        .then(() => {
          toast.success('The tool was edited successfully.');
        })
        .catch(() => {
          toast.error('The tool could not be edited!');
        });
    } else {
      await db
        .insert(tools)
        .values(_values)
        .then(() => {
          toast.success('The tool was created successfully.');

          navigate({ to: '/tools' });
        })
        .catch(() => {
          toast.error('The new tool was not created!');
        });
    }
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
                    <Input
                      placeholder="Brand"
                      {...field}
                      value={field.value ?? ''}
                    />
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
                    <Input
                      placeholder="Accuracy"
                      {...field}
                      value={field.value ?? ''}
                    />
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
                    <Input
                      placeholder="Range"
                      {...field}
                      value={field.value ?? ''}
                    />
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
                    <Input
                      placeholder="Serial Number"
                      {...field}
                      value={field.value ?? ''}
                    />
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
                    <Input
                      placeholder="Property Code"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="quantity"
              disabled={disabled}
              defaultValue={values?.quantity ?? 0}
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
                    <Textarea
                      placeholder="Description"
                      {...field}
                      value={field.value ?? ''}
                    />
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

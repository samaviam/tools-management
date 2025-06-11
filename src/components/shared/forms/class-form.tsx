import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
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
import db from '@/db';
import { classes } from '@/db/schema';
import { Class, Degree } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ClassForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: Class.Item.Type; disabled?: boolean }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(
      Class.Item.zod.omit({ id: true, created_at: true, updated_at: true }),
    ),
  });

  const handleSubmit = async (
    _values: Omit<Class.Item.Type, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    if (values) {
      // UPDATE
      await db
        .update(classes)
        .set(_values)
        .where(eq(classes.id, values.id))
        .then(() => {
          toast.success('The class was edited successfully.');
        })
        .catch(() => {
          toast.error('The class could not be edited!');
        });
    } else {
      await db
        .insert(classes)
        .values(_values)
        .then(() => {
          toast.success('The class was created successfully.');

          navigate({ to: '/classes' });
        })
        .catch(() => {
          toast.error('The new class was not created!');
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
              name="title"
              disabled={disabled}
              defaultValue={values?.title ?? ''}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="Class name" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="degree"
              disabled={disabled}
              defaultValue={values?.degree}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Degree</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(Number.parseInt(value))
                    }
                    defaultValue={field.value?.toString()}
                    disabled={field.disabled}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the class degree level" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value={Degree.associate.toString()}>
                        Associate
                      </SelectItem>
                      <SelectItem value={Degree.bachelor.toString()}>
                        Bachelor
                      </SelectItem>
                    </SelectContent>
                  </Select>

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

export default ClassForm;

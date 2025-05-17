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

const formSchema = z.object({
  name: z.string(),
  tools: z.string().array(),
});

const ClassForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: any; disabled?: boolean }) => {
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
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Class name" {...field} />
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

export default ClassForm;

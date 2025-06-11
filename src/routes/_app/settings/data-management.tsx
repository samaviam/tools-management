import { z } from 'zod';
import Papa from 'papaparse';
import { Download, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Main } from '@/components/layout/main';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import db from '@/db';
import { tools } from '@/db/schema';
import type { Tool } from '@/types';

const TYPES = [
  { value: 'tools', label: 'Tools' },
  // { value: 'classes', label: 'Classes' },
  // { value: 'students', label: 'Students' },
];

export const Route = createFileRoute('/_app/settings/data-management')({
  component: RouteComponent,
});

const ImportForm = () => {
  const formSchema = z.object({
    type: z.string(),
    file: z
      .any()
      .refine((file) => file !== undefined, 'CSV file is required.')
      .refine(
        (file) => file?.type === 'text/csv',
        'The file must be in csv format.',
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onImportSubmit = async (values: z.infer<typeof formSchema>) => {
    Papa.parse<Tool.Item.Type>(values.file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (values.type === 'tools') {
          await db
            .insert(tools)
            .values(results.data)
            .then(() => {
              toast.success('Tools imported successfully');
            })
            .catch(() => {
              toast.error('Tools does not import!');
            });
        }
      },
    });
  };

  return (
    <Card className="mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onImportSubmit)}>
          <CardHeader className="border-b">Import Data</CardHeader>

          <CardContent className="py-6">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of input data" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="file"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr]">
                  <FormLabel>File</FormLabel>

                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      value={field.value?.fileName}
                      onChange={(event) => {
                        field.onChange(event.target.files?.[0]);
                      }}
                    />
                  </FormControl>

                  <FormDescription className="col-start-2">
                    Only csv files are supported.
                  </FormDescription>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t">
            <Button>
              <Upload /> Import
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const ExportForm = () => {
  const form = useForm();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onExportSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onExportSubmit)}>
          <CardHeader className="border-b">Export Data</CardHeader>

          <CardContent className="py-6">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr]">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of input data" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t">
            <Button>
              <Download /> Export
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

function RouteComponent() {
  return (
    <Main>
      <ImportForm />

      <ExportForm />
    </Main>
  );
}

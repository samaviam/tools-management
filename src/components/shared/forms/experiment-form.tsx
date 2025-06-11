import { useEffect, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { desc, eq } from 'drizzle-orm';
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
  FormFieldRepeater,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveButton } from '@/components/ui/save-button';
import { Combobox } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Degree, Experiment, Tool } from '@/types';
import { UseToolsQuery } from '@/queries/tools/use-tools-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import db from '@/db';
import { experiments, experimentsTools } from '@/db/schema';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';

const ExperimentForm = ({
  title,
  values,
  disabled = false,
}: {
  title: string;
  values?: Experiment.WithRelations.Type;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();
  const [tools, addTools] = useState<Tool.List>([]);

  useEffect(() => {
    (async () => {
      const result = await UseToolsQuery.fn();

      addTools(result);
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      tools: values?.tools,
    },
    resolver: zodResolver(
      Experiment.WithRelations.zod
        .omit({
          id: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        })
        .extend({
          tools: z.any().array(),
        }),
    ),
  });

  const handleSubmit = async (
    _values: Omit<
      Experiment.WithRelations.Type,
      'id' | 'created_at' | 'updated_at' | 'deleted_at'
    >,
  ) => {
    let id: number;
    const tools = _values.tools.map((tool) => tool?.id ?? tool);

    if (values) {
      id = values.id;
      await db
        .update(experiments)
        .set(_values)
        .where(eq(experiments.id, values.id));
    } else {
      await db
        .insert(experiments)
        .values(_values)
        .then(() => {
          toast.success('The experiment was created successfully.');
        })
        .catch(() => {
          toast.error('The new experiment was not created!');
        });
      id = (
        (await db
          .select()
          .from(experiments)
          .limit(1)
          .orderBy(desc(experiments.id))
          .get()) as Experiment.Item.Type
      ).id;
    }

    await db
      .delete(experimentsTools)
      .where(eq(experimentsTools.experiment_id, id));
    await db
      .insert(experimentsTools)
      .values(tools.map((tool) => ({ experiment_id: id, tool_id: tool })));

    navigate({ to: '/experiments' });
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
              control={form.control}
              defaultValue={values?.name ?? ''}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Experiment name" {...field} />
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

            <FormFieldRepeater
              name="tools"
              disabled={disabled}
              control={form.control}
              defaultValue={values?.tools ?? undefined}
              legend="Default Tools"
              className="mb-4"
              render={({ field }) => {
                const value = field.value as unknown as Tool.Item.Type;

                return (
                  <FormItem className="grow grid-cols-[300px_1fr] mb-4">
                    <FormLabel>Tool</FormLabel>

                    <Combobox<Tool.Item.Type>
                      label="name"
                      value="id"
                      items={tools}
                      placeholder="Search tool..."
                      options={{
                        threshold: 0.3,
                        keys: [
                          'name',
                          'serial_code',
                          'brand',
                          'accuracy',
                          'serial_number',
                        ],
                      }}
                      defaultValue={value}
                      triggerClassName={
                        value?.status === Tool.Status.Broken
                          ? '!border-error'
                          : ''
                      }
                      onChange={field.onChange}
                    >
                      {({ value }) => (
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            disabled={disabled}
                          >
                            {value ? value.label : 'Select tool...'}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      )}
                    </Combobox>

                    <FormMessage className="col-start-2" />
                  </FormItem>
                );
              }}
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

            <FormField
              name="status"
              disabled={disabled}
              defaultValue={values?.status ?? true}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Status</FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={field.disabled}
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

export default ExperimentForm;

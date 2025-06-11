import { useEffect, useState } from 'react';
import { CalendarIcon, ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { desc, eq } from 'drizzle-orm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
import { SaveButton } from '@/components/ui/save-button';
import { Combobox } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import {
  type Class,
  type Experiment,
  type Group,
  Schedule,
  SchedulesTools,
  type Tool,
} from '@/types';
import { UseToolsQuery } from '@/queries/tools/use-tools-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import db from '@/db';
import { schedules, schedulesTools } from '@/db/schema';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { Calendar } from '@/components/ui/calendar';
import { UseClassesQuery } from '@/queries/classes/use-classes-query';
import { UseExperimentsQuery } from '@/queries/experiments/use-experiments-query';
import { UseGroupsQuery } from '@/queries/groups/use-groups-query';

const ScheduleForm = ({
  title,
  values,
  manually = false,
  disabled = false,
}: {
  title: string;
  values?: Schedule.WithRelations.Type;
  manually?: boolean;
  disabled?: boolean;
}) => {
  const navigate = useNavigate();
  const [tools, addTools] = useState<Tool.List>([]);
  const [classes, addClasses] = useState<Class.List>([]);
  const [groups, addGroups] = useState<Group.List>([]);
  const [experiments, addExperiments] = useState<Experiment.List>([]);

  useEffect(() => {
    (async () => {
      const _tools = await UseToolsQuery.fn();
      const _classes = await UseClassesQuery.fn();
      const _groups = await UseGroupsQuery.fn();
      const _experiments = await UseExperimentsQuery.fn();

      addTools(_tools);
      addClasses(_classes);
      addGroups(_groups);
      addExperiments(_experiments);
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      tools: values?.tools ?? [],
    },
    resolver: zodResolver(
      Schedule.WithRelations.zod
        .omit({
          id: true,
          class: true,
          group: true,
          experiment: true,
          created_at: true,
          updated_at: true,
        })
        .extend({
          tools: z.any().array(),
        }),
    ),
  });
  console.log(form.formState.errors);

  const handleSubmit = async (
    _values: Omit<
      Schedule.WithRelations.Type,
      'id' | 'class' | 'group' | 'experiment' | 'created_at' | 'updated_at'
    >,
  ) => {
    console.log(_values);
    let id: number;
    const tools = _values.tools?.map((tool) => tool?.id ?? tool);

    if (values) {
      id = values.id;
      await db
        .update(schedules)
        .set(_values)
        .where(eq(schedules.id, values.id));
    } else {
      await db
        .insert(schedules)
        .values(_values)
        .then(() => {
          toast.success('The schedule was created successfully.');
        })
        .catch(() => {
          toast.error('The new schedule was not created!');
        });
      id = (
        (await db
          .select()
          .from(schedules)
          .limit(1)
          .orderBy(desc(schedules.id))
          .get()) as Schedule.Item.Type
      ).id;
    }

    if (tools) {
      await db.delete(schedulesTools).where(eq(schedulesTools.schedule_id, id));
      await db
        .insert(schedulesTools)
        .values(tools.map((tool) => ({ schedule_id: id, tool_id: tool })));
    }

    navigate({ to: '/schedules' });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader className="border-b">{title}</CardHeader>

          <CardContent className="py-6">
            <FormField
              name="class_id"
              disabled={!manually}
              defaultValue={values?.class_id}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Class</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={field.disabled}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the class" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {classes.map((_class) => (
                        <SelectItem
                          key={_class.id}
                          value={_class.id.toString()}
                        >
                          {_class.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="group_id"
              disabled={!manually}
              defaultValue={values?.group_id}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Group</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={field.disabled}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the Group" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="experiment_id"
              disabled={!manually}
              defaultValue={values?.experiment_id}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Experiment</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={field.disabled}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the Experiment" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {experiments.map((exp) => (
                        <SelectItem key={exp.id} value={exp.id.toString()}>
                          {exp.name}
                        </SelectItem>
                      ))}
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
              legend="Add Tool"
              className="mb-4"
              render={({ field }) => {
                return (
                  <FormItem className="grow grid-cols-[300px_1fr] mb-4">
                    <FormLabel>Tool</FormLabel>

                    <div className="flex gap-x-2">
                      <Controller
                        name={field.name}
                        defaultValue={field.value}
                        render={({ field }) => (
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
                            defaultValue={
                              field.value as unknown as Tool.Item.Type
                            }
                            onChange={field.onChange}
                          >
                            {({ value }) => (
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="flex-2/3 justify-between"
                                  disabled={disabled}
                                >
                                  {value ? value.label : 'Select tool...'}
                                  <ChevronsUpDown className="opacity-50" />
                                </Button>
                              </FormControl>
                            )}
                          </Combobox>
                        )}
                      />

                      <Controller
                        name={`${field.name}.status`}
                        disabled={field.disabled}
                        render={({ field }) => (
                          <Select
                            defaultValue={field.value?.toString()}
                            onValueChange={(value) =>
                              field.onChange(Number.parseInt(value))
                            }
                            disabled={field.disabled}
                          >
                            <SelectTrigger className="flex-1/3">
                              <SelectValue placeholder="Status of tool" />
                            </SelectTrigger>

                            <SelectContent>
                              {Object.keys(SchedulesTools.Status)
                                .filter((status) =>
                                  Number.isNaN(Number.parseInt(status)),
                                )
                                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                                .map((status: any) => (
                                  <SelectItem
                                    key={SchedulesTools.Status[
                                      status
                                    ].toString()}
                                    value={SchedulesTools.Status[
                                      status
                                    ].toString()}
                                  >
                                    {status}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <FormMessage className="col-start-2" />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="start_at"
              disabled={disabled}
              defaultValue={values?.start_at}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grow grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Start Date</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                          disabled={field.disabled}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(day) => {
                          day && field.onChange(new Date(day).toISOString());
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
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

            {/* <FormField
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
            /> */}
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

export default ScheduleForm;

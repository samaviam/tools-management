import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { type Class, type Group, Student } from '@/types';
import db from '@/db';
import { students } from '@/db/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseClassesQuery } from '@/queries/classes/use-classes-query';
import { UseGroupsQuery } from '@/queries/groups/use-groups-query';
import { useNavigate } from '@tanstack/react-router';

const StudentForm = ({
  title,
  values,
  disabled = false,
}: { title: string; values?: Student.Item.Type; disabled?: boolean }) => {
  const navigate = useNavigate();
  const [classes, addClasses] = useState<Class.List>([]);
  const [groups, addGroups] = useState<Group.List>([]);

  useEffect(() => {
    (async () => {
      const _classes = await UseClassesQuery.fn();
      const _groups = await UseGroupsQuery.fn();

      addClasses(_classes);
      addGroups(_groups);
    })();
  }, []);
  const form = useForm({
    resolver: zodResolver(
      Student.Item.zod.omit({
        id: true,
        created_at: true,
        updated_at: true,
      }),
    ),
  });

  const handleSubmit = async (
    _values: Omit<Student.Item.Type, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    if (values) {
      // UPDATE
      await db
        .update(students)
        .set(_values)
        .where(eq(students.id, values.id))
        .then(() => {
          toast.success('The group was edited successfully.');
        })
        .catch(() => {
          toast.error('The group could not be edited!');
        });
    } else {
      await db
        .insert(students)
        .values(_values)
        .then(() => {
          toast.success('The group was created successfully.');

          navigate({ to: '/students' });
        })
        .catch(() => {
          toast.error('The new group was not created!');
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
                    <Input placeholder="Student name" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="class_id"
              disabled={disabled}
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
                        <SelectValue placeholder="Select the class of student" />
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
              disabled={disabled}
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
                        <SelectValue placeholder="Select the group of student" />
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
              name="national_id"
              disabled={disabled}
              defaultValue={values?.national_id}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>National ID</FormLabel>

                  <FormControl>
                    <Input placeholder="National ID" {...field} />
                  </FormControl>

                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="student_id"
              disabled={disabled}
              defaultValue={values?.student_id}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid-cols-[300px_1fr] mb-4">
                  <FormLabel>Student ID</FormLabel>

                  <FormControl>
                    <Input placeholder="Student ID" {...field} />
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

export default StudentForm;

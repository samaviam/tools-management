import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';
import db from '@/db';
import { students } from '@/db/schema';
import { Student } from '@/types';

export namespace UseStudentMutation {
  export const key = ['get-student'];

  export const fn = async ({
    id,
  }: { id: number }): Promise<Student.Item.Type> => {
    const result = await db
      .select()
      .from(students)
      .where(eq(students.id, id))
      .get();

    return Student.Item.zod.parse(result);
  };
}

export const useStudent = () =>
  useMutation({
    mutationKey: UseStudentMutation.key,
    mutationFn: UseStudentMutation.fn,
  });

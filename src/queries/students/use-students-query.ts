import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { Student } from '@/types';

export namespace UseStudentsQuery {
  export const key = ['get-all-students'];

  export const fn = async (): Promise<Student.WithRelations.List> => {
    const results = await db.query.students.findMany({
      with: { class: true, group: true },
    });

    return Student.WithRelations.zod.array().parse(results);
  };
}

export const useGetStudents = () =>
  useQuery({
    queryKey: UseStudentsQuery.key,
    queryFn: UseStudentsQuery.fn,
  });

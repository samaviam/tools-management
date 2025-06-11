import { useEffect } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { useStudent } from '@/queries/students/use-student-mutation';
import { StudentForm } from '@/components/shared';

export const Route = createFileRoute('/_app/students/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useStudent();
  const { id } = useParams({ from: '/_app/students/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Student</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/students/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <StudentForm title="Edit the Student" values={data} /> : null}
    </Main>
  );
}

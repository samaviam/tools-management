import { useEffect } from 'react';
import { Main, MainHeader } from '@/components/layout/main';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { StudentForm } from '@/components/shared';
import { useStudent } from '@/queries/students';

export const Route = createFileRoute('/_app/students/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useStudent();
  const { id } = useParams({ from: '/_app/students/$id/' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Student</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/students/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <StudentForm title="Student" values={data} disabled /> : null}
    </Main>
  );
}

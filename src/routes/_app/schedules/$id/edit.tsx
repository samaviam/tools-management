import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ScheduleForm } from '@/components/shared';
import { useSchedule } from '@/queries/schedules';

export const Route = createFileRoute('/_app/schedules/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useSchedule();
  const { id } = useParams({ from: '/_app/schedules/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Schedule</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/schedules/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <ScheduleForm title="Schedule" values={data} /> : null}
    </Main>
  );
}

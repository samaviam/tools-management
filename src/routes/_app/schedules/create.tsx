import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { ScheduleForm } from '@/components/shared';

export const Route = createFileRoute('/_app/schedules/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Schedule</h2>
        </div>
      </MainHeader>

      <ScheduleForm title="Create new Schedule" manually />
    </Main>
  );
}

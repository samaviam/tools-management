import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { ClassForm } from '@/components/shared';

export const Route = createFileRoute('/_app/classes/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Class</h2>
        </div>
      </MainHeader>

      <ClassForm title="Create new Class" />
    </Main>
  );
}

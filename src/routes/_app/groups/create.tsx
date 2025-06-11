import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { GroupForm } from '@/components/shared';

export const Route = createFileRoute('/_app/groups/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Group</h2>
        </div>
      </MainHeader>

      <GroupForm title="Create new Group" />
    </Main>
  );
}

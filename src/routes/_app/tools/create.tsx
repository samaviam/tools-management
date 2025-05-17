import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import ToolForm from '@/components/shared/forms/tool-form';

export const Route = createFileRoute('/_app/tools/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Tool</h2>
        </div>
      </MainHeader>

      <ToolForm title="Create new Tool" />
    </Main>
  );
}

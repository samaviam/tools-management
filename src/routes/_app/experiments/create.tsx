import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { ExperimentForm } from '@/components/shared';

export const Route = createFileRoute('/_app/experiments/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Experiment</h2>
          {/* <p className="text-muted-foreground">
            Manage your tools and their status here.
          </p> */}
        </div>
      </MainHeader>

      <ExperimentForm title="Create Experiment" />
    </Main>
  );
}

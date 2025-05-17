import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import ExperimentForm from '@/components/shared/forms/experiment-form';

export const Route = createFileRoute('/_app/experiments/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = {};

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Experiment</h2>
        </div>
      </MainHeader>

      {data ? (
        <ExperimentForm title="Edit the Experiment" values={data} />
      ) : null}
    </Main>
  );
}

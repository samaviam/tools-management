import { createFileRoute, useParams } from '@tanstack/react-router';
import { Main } from '@/components/layout/main';
import ExperimentForm from '@/components/shared/forms/experiment-form';

export const Route = createFileRoute('/_app/experiments/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = {};
  const { id } = useParams({ from: '/_app/experiments/$id/' });

  return (
    <Main>
      {data ? <ExperimentForm title="View Experiment" values={data} /> : null}
    </Main>
  );
}

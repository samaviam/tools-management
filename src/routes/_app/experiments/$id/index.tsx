import { useEffect } from 'react';
import { Link, createFileRoute, useParams } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import { ExperimentForm } from '@/components/shared';
import { useExperiment } from '@/queries/experiments';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_app/experiments/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useExperiment();
  const { id } = useParams({ from: '/_app/experiments/$id/' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Experiment</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/experiments/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? (
        <ExperimentForm title="View Experiment" values={data} disabled />
      ) : null}
    </Main>
  );
}

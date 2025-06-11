import { useEffect } from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { ExperimentForm } from '@/components/shared';
import { useExperiment } from '@/queries/experiments';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Eye } from 'lucide-react';

export const Route = createFileRoute('/_app/experiments/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useExperiment();
  const { id } = useParams({ from: '/_app/experiments/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Experiment</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/experiments/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? (
        <ExperimentForm title="Edit the Experiment" values={data} />
      ) : null}
    </Main>
  );
}

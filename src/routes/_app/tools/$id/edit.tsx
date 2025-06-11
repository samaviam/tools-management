import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { useEffect } from 'react';
import { useTool } from '@/queries/tools';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ToolForm } from '@/components/shared';

export const Route = createFileRoute('/_app/tools/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useTool();
  const { id } = useParams({ from: '/_app/tools/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Tool</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/tools/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <ToolForm title="Edit the Tool" values={data} /> : null}
    </Main>
  );
}

import { useEffect } from 'react';
import { Main, MainHeader } from '@/components/layout/main';
import { useTool } from '@/queries/tools';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { ToolForm } from '@/components/shared';

export const Route = createFileRoute('/_app/tools/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useTool();
  const { id } = useParams({ from: '/_app/tools/$id/' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Tool</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/tools/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <ToolForm title="Tool" values={data} disabled /> : null}
    </Main>
  );
}

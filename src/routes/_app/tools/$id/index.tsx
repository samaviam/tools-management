import { useEffect } from 'react';
import { Main, MainHeader } from '@/components/layout/main';
import ToolForm from '@/components/shared/forms/tool-form';
import { useTool } from '@/queries/tools';
import { createFileRoute, useParams } from '@tanstack/react-router';

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
      </MainHeader>

      {data ? <ToolForm title="Tool" values={data} disabled /> : null}
    </Main>
  );
}

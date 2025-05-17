import { createFileRoute, useParams } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import ToolForm from '@/components/shared/forms/tool-form';
import { useEffect } from 'react';
import { useTool } from '@/queries/tools';

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
      </MainHeader>

      {data ? <ToolForm title="Edit the Tool" values={data} /> : null}
    </Main>
  );
}

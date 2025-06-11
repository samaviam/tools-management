import { useEffect } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { useGroup } from '@/queries/groups';
import { GroupForm } from '@/components/shared';

export const Route = createFileRoute('/_app/groups/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useGroup();
  const { id } = useParams({ from: '/_app/groups/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Group</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/groups/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <GroupForm title="Edit the Group" values={data} /> : null}
    </Main>
  );
}

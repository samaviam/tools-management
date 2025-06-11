import { useEffect } from 'react';
import { Main, MainHeader } from '@/components/layout/main';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useGroup } from '@/queries/groups';
import { GroupForm } from '@/components/shared';

export const Route = createFileRoute('/_app/groups/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useGroup();
  const { id } = useParams({ from: '/_app/groups/$id/' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Group</h2>
        </div>

        <div className="flex gap-x-2">
          <Button asChild>
            <Link to="/groups/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <GroupForm title="Group" values={data} disabled /> : null}
    </Main>
  );
}

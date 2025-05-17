import { createFileRoute, Link } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import { GroupsTable } from '@/components/shared';

export const Route = createFileRoute('/_app/groups/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = [
    {
      id: 1,
      class_id: 1,
      name: 'Group name',
      members: '3',
      experiments: '10',
      created_at: '',
      updated_at: '',
    },
  ];

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Groups List</h2>
          <p className="text-muted-foreground">Manage your Groups.</p>
        </div>

        <div>
          <Button asChild>
            <Link to="/groups/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div>
      </MainHeader>

      <Card>
        <CardContent>
          <GroupsTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

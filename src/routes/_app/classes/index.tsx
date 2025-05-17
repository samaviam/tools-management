import { createFileRoute, Link } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { Main, MainHeader } from '@/components/layout/main';
import { Card, CardContent } from '@/components/ui/card';
import { ClassesTable } from '@/components/shared';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_app/classes/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data } = useGetClasses();
  const data = [{ id: 1, name: 'Class Name', groups: 10, students: 20 }];

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Classes List</h2>
          <p className="text-muted-foreground">Manage your Classes.</p>
        </div>

        <div>
          <Button asChild>
            <Link to="/classes/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div>
      </MainHeader>

      <Card>
        <CardContent>
          <ClassesTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

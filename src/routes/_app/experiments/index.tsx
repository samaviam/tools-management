import { createFileRoute, Link } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import { ExperimentsTable } from '@/components/shared';
import { useGetExperiments } from '@/queries/experiments';

export const Route = createFileRoute('/_app/experiments/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetExperiments();

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Experiments List
          </h2>
          <p className="text-muted-foreground">Manage your Experiments.</p>
        </div>

        <div>
          <Button asChild>
            <Link to="/experiments/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div>
      </MainHeader>

      <Card>
        <CardContent>
          <ExperimentsTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

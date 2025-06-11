import { createFileRoute, Link } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { Card, CardContent } from '@/components/ui/card';
import { ToolsTable } from '@/components/shared';
import { useGetTools } from '@/queries/tools';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';

export const Route = createFileRoute('/_app/tools/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetTools();

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tools List</h2>
          <p className="text-muted-foreground">
            Manage your tools and their status here.
          </p>
        </div>

        <div>
          <Button asChild>
            <Link to="/tools/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div>
      </MainHeader>

      <Card>
        <CardContent>
          <ToolsTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

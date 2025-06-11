import { Main, MainHeader } from '@/components/layout/main';
import { SchedulesTable } from '@/components/shared';
// import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetSchedules } from '@/queries/schedules';
// import { IconPlus } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/schedules/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetSchedules();

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedules List</h2>
          <p className="text-muted-foreground">
            Manage your schedules and their status here.
          </p>
        </div>

        {/* <div>
          <Button asChild>
            <Link to="/schedules/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div> */}
      </MainHeader>

      <Card>
        <CardContent>
          <SchedulesTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

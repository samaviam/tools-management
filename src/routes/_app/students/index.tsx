import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { Card, CardContent } from '@/components/ui/card';
import { StudentsTable } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';
import { useGetStudents } from '@/queries/students';
import db from '@/db';
import { classes, groups } from '@/db/schema';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export const Route = createFileRoute('/_app/students/')({
  loader: async () => {
    return {
      classes_count: await db.$count(classes),
      groups_count: await db.$count(groups),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { classes_count, groups_count } = Route.useLoaderData();
  const { data } = useGetStudents();

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students List</h2>
          <p className="text-muted-foreground">Manage your students.</p>
        </div>

        <div>
          <Button asChild>
            <Link to="/students/create">
              Create <IconPlus />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {!classes_count ? (
        <Alert className="mb-2">
          <Info />
          <AlertTitle>Recommended</AlertTitle>
          <AlertDescription>
            <div>
              There are currently no <b>classes</b>. It is best to create a{' '}
              <b>class</b> before creating a student.
            </div>
          </AlertDescription>
        </Alert>
      ) : null}

      {!groups_count ? (
        <Alert className="mb-2">
          <Info />
          <AlertTitle>Recommended</AlertTitle>
          <AlertDescription>
            <div>
              There are currently no <b>groups</b>. It is best to create a{' '}
              <b>group</b> before creating a student.
            </div>
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardContent>
          <StudentsTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

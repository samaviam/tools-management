import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { Card, CardContent } from '@/components/ui/card';
import { StudentsTable } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';

export const Route = createFileRoute('/_app/students/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = [
    {
      id: '1',
      class_id: '2',
      name: 'اذريان - عليرضا',
      national_id: '0926766661',
      student_id: '01211055317003',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
    },
  ];

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

      <Card>
        <CardContent>
          <StudentsTable data={data} />
        </CardContent>
      </Card>
    </Main>
  );
}

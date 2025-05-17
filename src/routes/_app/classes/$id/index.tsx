import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { IconSchool, IconUsersGroup } from '@tabler/icons-react';
import { Pencil } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import ClassForm from '@/components/shared/forms/class-form';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_app/classes/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: '/_app/classes/$id/' });

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Class</h2>
        </div>

        <div className="flex gap-x-2">
          <Button variant="outline" asChild>
            <Link to="/groups">
              Groups <IconUsersGroup />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/students">
              Students <IconSchool />
            </Link>
          </Button>

          <Button asChild>
            <Link to="/classes/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>
        </div>
      </MainHeader>

      <ClassForm title="View the Class" disabled />
    </Main>
  );
}
